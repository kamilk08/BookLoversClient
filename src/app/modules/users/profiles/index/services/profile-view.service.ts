import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { FollowersFacade } from '../../../reader-followers/followers.facade';
import { combineLatest } from 'rxjs';
import { TimeLineFacade } from '../../../timelines/store/timeline.facade';
import { ActivityTypesEnum } from '../../../../api/timelines/models/activity-type.interface';
import { TimeLine } from '../../../../api/timelines/models/timeline.interface';
import { PaginatedRatingsFacade } from 'src/app/modules/classification/ratings/store/paginated-ratings/paginated-ratings.facade';
import { QuotesFacade } from 'src/app/modules/quotes/store/quotes/quote.facade';
import { ReaderStatisticsFacade } from '../../../statistics/store/reader-statistics.facade';
import { AvatarsFacade } from '../../../avatars/store/avatars.facade';
import { FavouritesFacade } from '../../favourites/store/favourites.facade';
import { BookcaseFacade } from 'src/app/modules/bookcases/store/bookcases/bookcase.facade';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { ProfileFacade } from '../../store/profile/profile.facade';
import { ReadersFacade } from '../../../readers/store/readers/reader.facade';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';

@Injectable()
export class ProfileViewService {

  public readonly activityTypesEnum = ActivityTypesEnum;

  public readonly timeLineActivities$ = (readerId: number) => this.timeLineFacade.readerTimeLine$(readerId)
    .pipe(
      filter(noNullOrUndefined()),
      map((timeLine: TimeLine) => timeLine.indentification.id),
      switchMap(() => this.timeLineFacade.activitiesPageResult$),
      filter(f => f !== undefined),
      map(s => s.items)
    );

  public readonly processFavouriteBooks$ = () => {
    return combineLatest([this.favouritesFacade.processingNewBook$, this.favouritesFacade.selectingFavouriteBooks$])
      .pipe(
        map(stream => { return { processingNewBook: stream[0], selectingFavouriteBooks: stream[1] } }),
        map(stream => stream.processingNewBook === false && stream.selectingFavouriteBooks === false)
      )
  };

  public readonly processingFavouriteAuthors$ = () => {
    return combineLatest([this.favouritesFacade.processingNewAuthor$, this.favouritesFacade.selectingFavouriteAuthors$])
      .pipe(
        map(stream => { return { processingFavouriteAuthor: stream[0], selectingFavouriteAuthors: stream[1] } }),
        map(stream => stream.processingFavouriteAuthor === false && stream.selectingFavouriteAuthors === false)
      )
  }

  constructor(
    public readonly avatarFacade: AvatarsFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly bookFacade: BookFacade,
    public readonly bookcaseFacade: BookcaseFacade,
    public readonly favouritesFacade: FavouritesFacade,
    public readonly profileFacade: ProfileFacade,
    public readonly paginatedRatingsFacade: PaginatedRatingsFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly followersFacade: FollowersFacade,
    public readonly statisticsFacade: ReaderStatisticsFacade,
    public readonly timeLineFacade: TimeLineFacade,
    public readonly quotesFacade: QuotesFacade) { }


}
