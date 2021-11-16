import { createSelector } from "@ngrx/store";
import { ReviewsModuleState, reviewsModuleState } from "..";
import { EditReviewState } from "./edit-review.reducer";

const editReviewState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.editReview;

  return undefined;
});

export const isEditedSuccessfully = createSelector(editReviewState, (state: EditReviewState) => {
  if (state) return state.isEditedSuccessfully;

  return undefined;
});
