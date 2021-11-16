import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Book } from "src/app/modules/api/books/models";
import { BookcaseFacade } from "src/app/modules/bookcases/store/bookcases/bookcase.facade";
import { RatingsOverviewFacade } from "src/app/modules/classification/ratings-overview/store/ratings-overview.facade";
import { SeriesFacade } from "src/app/modules/series/store/series/series.facade";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ReadersFacade } from "../../../readers/store/readers/reader.facade";
import { ReviewsFacade } from "../../../reviews/store/reviews/reviews.facade";
import { ActivityType } from "../../../../api/timelines/models/activity-type.interface";
import { TimeLineFacade } from "../timeline.facade";
import * as fromActions from './timeline-page.actions';
import { TimeLinePageFacade } from "./timeline-page.facade";
import { AuthorFacade } from "src/app/modules/authors/store/authors/author.facade";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { TimeLine } from "src/app/modules/api/timelines/models/timeline.interface";

@Injectable()
export class TimeLinePageEffects {

  constructor(private actions$: Actions,
    private readonly readersFacade: ReadersFacade,
    private readonly authorsFacade: AuthorFacade,
    private readonly seriesFacade: SeriesFacade,
    private readonly reviewsFacade: ReviewsFacade,
    private readonly ratingsOverviewFacade: RatingsOverviewFacade,
    private readonly timeLineFacade: TimeLineFacade,
    private readonly bookcaseFacade: BookcaseFacade,
    private readonly pageFacade: TimeLinePageFacade
  ) {

  }

  setTimeLineId$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_TIMELINE_ID_ON_TIMELINE_PAGE),
      map(action => action.payload.id),
      withLatestFrom(this.pageFacade.showHiddenActivities$),
      map(stream => ({ id: stream[0], showHidden: stream[1] })),
      tap((stream) => this.timeLineFacade.selectTimeLine(stream.id)),
      tap((stream) => this.timeLineFacade.selectActivities(stream.id, DEFAULT_QUERY(), stream.showHidden)),
      switchMap(stream => this.timeLineFacade.timeLineById$(stream.id)),
      filter((timeline: TimeLine) => timeline !== undefined),
      tap((timeline: TimeLine) => this.readersFacade.selectReader(timeline.readerId)),
      tap((timeline: TimeLine) => this.bookcaseFacade.selectUserBookcase(timeline.readerId))
    ), { dispatch: false });

  changePage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_TIMELINE_ACTIVITIES_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.timeLineId$, this.pageFacade.showHiddenActivities$),
      map(stream => ({ page: stream[0], timeLineId: stream[1], showHidden: stream[2] })),
      tap(stream => this.timeLineFacade
        .selectActivities(stream.timeLineId, DEFAULT_QUERY(stream.page), stream.showHidden))
    ), { dispatch: false });

  includeHiddenActivities$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.INCLUDE_HIDDEN_ACTIVITIES),
      map(action => action.payload.flag),
      withLatestFrom(this.pageFacade.currentPage$, this.pageFacade.timeLineId$),
      map(stream => ({ flag: stream[0], page: stream[1], timeLineId: stream[2] })),
      tap(stream => this.timeLineFacade.selectActivities(stream.timeLineId, DEFAULT_QUERY(), stream.flag))
    ), { dispatch: false })

  toggleActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.TOGGLE_ACTIVITY),
      map(action => action.payload.activity),
      tap((activity) => activity.show ? this.timeLineFacade.hideActivity(activity) : this.timeLineFacade.showActivity(activity))
    ), { dispatch: false })

  expandTimeLineActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EXPAND_TIMELINE_ACTIVITY),
      switchMap(action => [this.dict(action.payload.activityType, action.payload.activityObject)])
    ));

  expandBookAddedActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EXPAND_BOOK_ADDED_ACTIVITY),
      map(action => action.payload.book),
      tap((book: Book) => this.authorsFacade.selectMultipleAuthorsById(book.authors.map(s => s.authorId))),
      tap((book: Book) => book.series !== undefined ? this.seriesFacade.selectSeriesByBook(book.identification.id) : false),
      tap((book: Book) => this.ratingsOverviewFacade.selectRatingOverview(book.identification.id)),
    ), { dispatch: false })

  expandNewBookInBookcaseActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EXPAND_NEW_BOOK_IN_BOOKCASE_ACTIVITY),
      map(action => action.payload.book),
      tap((book: Book) => this.authorsFacade.selectMultipleAuthorsById(book.authors.map(s => s.authorId))),
      tap((book: Book) => book.series !== undefined ? this.seriesFacade.selectSeriesByBook(book.identification.id) : false),
      tap((book: Book) => this.ratingsOverviewFacade.selectRatingOverview(book.identification.id)),
    ), { dispatch: false });

  expandNewBookReviewActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EXPAND_NEW_BOOK_REVIEW_ACTIVITY),
      map(action => action.payload.book),
      withLatestFrom(this.pageFacade.timeLineId$),
      map(stream => ({ book: stream[0], timeLineId: stream[1] })),
      switchMap(stream => this.timeLineFacade.timeLineById$(stream.timeLineId)
        .pipe(map(timeLine => ({ book: stream.book, timeLine: timeLine })))),
      tap(stream => this.reviewsFacade.selectReview(stream.timeLine.readerId, stream.book.identification.id)),
      tap(stream => this.ratingsOverviewFacade.selectRatingOverview(stream.book.identification.id))
    ), { dispatch: false })


  private dict = (activityType: ActivityType, activityObject: any) => {
    const map = {
      'ADDED_BOOK': fromActions.EXPAND_BOOK_ADDED_ACTIVITY({ payload: { book: activityObject } }),
      'NEW_BOOK_IN_BOOKCASE': fromActions.EXPAND_NEW_BOOK_IN_BOOKCASE_ACTIVITY({ payload: { book: activityObject } }),
      'NEW_REVIEW': fromActions.EXPAND_NEW_BOOK_REVIEW_ACTIVITY({ payload: { book: activityObject } })
    }
    return map[activityType.name];
  }

}
