import { createSelector } from "@ngrx/store";
import { ReviewsModuleState, reviewsModuleState } from "..";
import { ReviewsPageState } from "./reviews-page.reducer";

const reviewsPageState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.reviewsPage;

  return undefined;
});

export const readerId = createSelector(reviewsPageState, (state: ReviewsPageState) => {
  if (state) return state.readerId;

  return undefined;
});
export const pageSize = createSelector(reviewsPageState, (state: ReviewsPageState) => {
  if (state) return state.pageSize;

  return undefined;
});
