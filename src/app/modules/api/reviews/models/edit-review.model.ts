import { UUID } from 'angular2-uuid';
import { AddReviewDetails } from './add-review-details.model';
import { Review } from './review.model';

export class EditReview {
  public readonly reviewId: number;
  public readonly reviewGuid: UUID;
  public readonly bookGuid: UUID;
  public readonly reviewDetails: AddReviewDetails

  constructor(review: Review) {
    this.reviewId = review.identification.id;
    this.reviewGuid = review.identification.guid;
    this.bookGuid = review.reviewedBook.bookGuid;
    this.reviewDetails = new AddReviewDetails(review);
  }
}
