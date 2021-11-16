import { createSelector } from "@ngrx/store";
import { reviewsModuleState, ReviewsModuleState } from "..";
import { AddReviewState } from "./add-review.reducer";

const addReviewState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.addReview;

  return undefined;
});

export const isAddedSuccessfully = createSelector(addReviewState, (state: AddReviewState) => {
  if(state) return state.isAddedSuccessfully;

  return undefined;
});
