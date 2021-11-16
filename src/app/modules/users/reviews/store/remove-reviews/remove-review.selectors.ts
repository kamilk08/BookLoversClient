import { createSelector } from "@ngrx/store";
import { ReviewsModuleState, reviewsModuleState } from "..";
import { RemoveReviewState } from "./remove-review.reducer";

const removeReviewState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.removeReviews;

  return undefined;
});

export const isRemovedSuccessfully = createSelector(removeReviewState, (state: RemoveReviewState) => {
  if (state) return state.isRemovedSuccessfully;

  return undefined;
});
