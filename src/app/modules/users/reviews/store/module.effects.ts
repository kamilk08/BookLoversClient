import { AddReviewEffects } from "./add-review/add-review.effects";
import { BookReviewsPaginationEffects } from "./book-reviews/reviews-pagination.effects";
import { EditReviewEffects } from "./edit-review/edit-review.effects";
import { ReaderReviewsPaginationEffects } from "./reader-reviews/reader-reviews-pagination.effects";
import { RemoveReviewEffects } from "./remove-reviews/remove-review.effects";
import { ReportReviewEffects } from "./report-review/report-review.effects";
import { ReviewLikesEffects } from "./review-likes/review-likes.effects";
import { ReviewSpoilerEffects } from "./review-spoilers/review-spoiler.effects";
import { ReviewsPageEffects } from "./reviews-page/reviews-page.effects";
import { ReviewsEffects } from "./reviews/review.effects";

export const effects: any[] = [
  ReviewsEffects,
  AddReviewEffects,
  EditReviewEffects,
  RemoveReviewEffects,
  ReportReviewEffects,
  ReviewLikesEffects,
  ReviewSpoilerEffects,
  ReviewsPageEffects,
  BookReviewsPaginationEffects,
  ReaderReviewsPaginationEffects]
