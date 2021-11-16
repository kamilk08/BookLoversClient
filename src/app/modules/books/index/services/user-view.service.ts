import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Review } from 'src/app/modules/api/reviews/models/review.model';;
import { ReviewsPaginationFacade } from 'src/app/modules/users/reviews/store/reviews-pagination.facade';
import { ReaderStatisticsFacade } from 'src/app/modules/users/statistics/store/reader-statistics.facade';
import { BookWebPageFacade } from '../../store/webpage/book-webpage.facade';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { ReviewsFacade } from 'src/app/modules/users/reviews/store/reviews/reviews.facade';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';

@Injectable()
export class UserViewService {

  public reviewAdded$: Subject<{ review: Review, stars: number }> = new Subject<{ review: Review, stars: number }>();

  isReviewLikedBy$ = (userId: number, reviewId: number) => this.reviewsPaginationFacade
    .paginatedReviews$
    .pipe(
      filter(noNullOrUndefined()),
      map((reviews: Review[]) => reviews.find(s => s.identification.id === reviewId)),
      filter(noNullOrUndefined()),
      map((review: Review) => review.hasReaderLike(userId))
    );

  isReviewSpoiler$ = (userId: number, reviewId: number) => this.reviewsPaginationFacade
    .paginatedReviews$
    .pipe(
      filter(noNullOrUndefined()),
      map((reviews: Review[]) => reviews.find(s => s.identification.id === reviewId)),
      filter(noNullOrUndefined()),
      map((review: Review) => review.hasSpoilerTag(userId))
    );

  isReviewReported$ = (userId: number, reviewId: number) => this.reviewsPaginationFacade
    .paginatedReviews$
    .pipe(
      filter(noNullOrUndefined()),
      map((reviews: Review[]) => reviews.find(s => s.identification.id === reviewId)),
      filter(noNullOrUndefined()),
      map((review: Review) => review.hasBeenReportedBy(userId))
    );

  constructor(
    public readonly pageFacade: BookWebPageFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly readersStatisticsFacade: ReaderStatisticsFacade,
    public readonly reviewsFacade: ReviewsFacade,
    public readonly reviewsPaginationFacade: ReviewsPaginationFacade) { }


  public hasReviews(reviews: Review[]) {
    if (reviews)
      return reviews.length > 0;

    return false;
  }

  public reviewsWithoutReader(reviews: Review[], userId: number, bookId: number) {
    return reviews.filter(p => p.reviewedBy.userId !== userId && p.reviewedBook.bookId === bookId);
  }

}
