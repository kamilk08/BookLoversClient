import { createSelector } from "@ngrx/store";
import { reviewsModuleState, ReviewsModuleState } from "..";
import { ReviewLikesState } from "./review-likes.reducer";

const reviewLikesState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.reviewLikes;

  return undefined;
});

export const likedReview = createSelector(reviewLikesState, (state: ReviewLikesState) => {
  if (state) return state.review;

  return undefined;
});
export const unlikedReview = createSelector(reviewLikesState, (state: ReviewLikesState) => {
  if (state) return state.review;

  return undefined;
});
