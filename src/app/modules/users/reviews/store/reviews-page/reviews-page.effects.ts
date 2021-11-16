import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { BookcaseFacade } from "src/app/modules/bookcases/store/bookcases/bookcase.facade";
import { ReadersFacade } from "../../../readers/store/readers/reader.facade";
import { REVIEWS_QUERY } from "../../models/reviews.query";
import { ReviewsPaginationFacade } from "../reviews-pagination.facade";
import * as fromActions from './reviews-page.actions';
import { ReviewsPageFacade } from "./reviews-page.facade";

@Injectable()
export class ReviewsPageEffects {

  constructor(private actions$: Actions,
    private readonly pageFacade: ReviewsPageFacade,
    private readonly paginationFacade: ReviewsPaginationFacade,
    private readonly readersFacade: ReadersFacade,
    private readonly bookcaseFacade: BookcaseFacade
  ) {

  }

  setReaderIdOnReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_ID_ON_REVIEWS_PAGE),
      map(action => action.payload.readerId),
      withLatestFrom(this.pageFacade.pageSize$),
      map(stream => ({ readerId: stream[0], pageSize: stream[1] })),
      tap((stream) => this.paginationFacade.selectReaderReviews(stream.readerId, REVIEWS_QUERY())),
      tap((stream) => this.readersFacade.selectReader(stream.readerId)),
      tap((stream) => this.bookcaseFacade.selectUserBookcase(stream.readerId)),
    ), { dispatch: false });

  nextReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_REVIEWS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.readerId$, this.pageFacade.pageSize$),
      map(stream => ({ readerId: stream[1], page: stream[0], pageSize: stream[2] })),
      tap(stream => this.paginationFacade.selectReaderReviews(stream.readerId, REVIEWS_QUERY(stream.page, undefined, undefined, stream.pageSize)))
    ), { dispatch: false })

}

