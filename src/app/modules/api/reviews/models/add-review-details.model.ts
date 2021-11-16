import { Review } from './review.model'

export class AddReviewDetails {
  public readonly content: string
  public readonly reviewDate: Date
  public readonly editDate: Date
  public readonly markedAsSpoiler: boolean

  constructor(review: Review) {
    this.content = review.reviewContent.reviewText;
    this.reviewDate = review.reviewContent.reviewDate;
    this.editDate = review.reviewContent.editedDate;
    this.markedAsSpoiler = review.reviewContent.markedAsSpoiler;
  }
}
