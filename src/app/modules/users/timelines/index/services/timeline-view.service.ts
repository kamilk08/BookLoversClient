import { Injectable } from '@angular/core';
import { TimeLineFacade } from '../../store/timeline.facade';
import { ActivityTypesEnum, NEW_BOOK_IN_BOOKCASE } from '../../../../api/timelines/models/activity-type.interface';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { Book } from 'src/app/modules/api/books/models';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { UUID } from 'angular2-uuid';
import { SeriesFacade } from 'src/app/modules/series/store/series/series.facade';
import { Bookcase } from 'src/app/modules/bookcases/models';
import { TimeLine } from '../../../../api/timelines/models/timeline.interface';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { BookcaseFacade } from 'src/app/modules/bookcases/store/bookcases/bookcase.facade';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { PreviewBookcaseSettingsComponent } from 'src/app/modules/bookcases/bookcase-settings/index/preview-bookcase-settings.component';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { ReadersFacade } from '../../../readers/store/readers/reader.facade';
import { ReviewsFacade } from '../../../reviews/store/reviews/reviews.facade';
import { TimeLineActivity } from '../../../../api/timelines/models/timeline-activity.interface';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { TimeLinePageFacade } from '../../store/timeline-page/timeline-page.facade';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class TimeLineViewService {

  public readonly activityTypesEnum = ActivityTypesEnum;

  public readonly activities$ = this.timeLineFacade
    .activitiesPageResult$
    .pipe(
      filter(noNullOrUndefined()),
      map((pageResult: PageResult) => pageResult.items as TimeLineActivity[]),
      map((activities: TimeLineActivity[]) => activities.map(s => s.activityData.id)),
      withLatestFrom(this.pageFacade.showHiddenActivities$),
      map(stream => ({ ids: stream[0], showHidden: stream[1] })),
      switchMap(stream => this.timeLineFacade.getActivities$(stream.ids, stream.showHidden))
    )


  public readonly bookAuthors$ = (bookGuid: UUID) => this.booksFacade.bookByGuid$(bookGuid)
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((book: Book) => this.authorsFacade.multipleAuthors$(book.authors.map(s => s.authorId)))
    );

  public readonly bookSeries$ = (bookGuid: UUID) => this.booksFacade.bookByGuid$(bookGuid)
    .pipe(
      filter(noNullOrUndefined()),
      filter((book: Book) => book.series !== undefined),
      switchMap((book: Book) => this.seriesFacade.seriesById$(book.series.seriesId))
    );

  public readonly bookOnCurrentShelf$ = (timeLineId: number, bookGuid: UUID) => this.timeLineFacade.timeLineById$(timeLineId)
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((timeLine: TimeLine) => this.bookcaseFacade.bookcaseByUser$(timeLine.readerId)),
      filter(noNullOrUndefined()),
      withLatestFrom(this.booksFacade.bookByGuid$(bookGuid)),
      map(stream => { return { bookcase: stream[0] as Bookcase, book: stream[1] as Book } }),
      map(stream => {
        const shelves = stream.bookcase.getCoreShelfs();
        const shelf = shelves.find(f => {
          if (stream.book)
            return f.books.includes(stream.book.identification.id)
          else return undefined;
        })
        return shelf;
      })
    );

  public readonly bookOverview$ = (bookGuid: UUID) => this.booksFacade.bookByGuid$(bookGuid)
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((book: Book) => this.ratingsOverviewFacade.singleOverview$(book.identification.id)),
    );

  constructor(
    public readonly authService: AuthService,
    public readonly timeLineFacade: TimeLineFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly booksFacade: BookFacade,
    public readonly seriesFacade: SeriesFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly bookcaseFacade: BookcaseFacade,
    public readonly reviewsFacade: ReviewsFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly pageFacade: TimeLinePageFacade
  ) { }

}
