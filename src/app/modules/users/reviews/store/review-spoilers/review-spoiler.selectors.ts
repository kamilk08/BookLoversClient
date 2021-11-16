import { createSelector } from "@ngrx/store";
import { reviewsModuleState, ReviewsModuleState } from "..";
import { ReviewSpoilersState } from "./review-spoiler.reducer";

const reviewSpoilersState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.reviewSpoilers;

  return undefined;
});

export const reviewMakredAsSpoiler = createSelector(reviewSpoilersState, (state: ReviewSpoilersState) => {
  if (state) return state.review;

  return undefined;
});
