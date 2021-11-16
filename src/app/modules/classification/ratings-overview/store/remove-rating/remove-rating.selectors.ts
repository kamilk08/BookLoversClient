import { createSelector } from "@ngrx/store";
import { ratingOverviewsState, RatingOverviewsState } from "..";
import { RemoveRatingState } from "./remove-rating.reducer";

const removeRatingState = createSelector(ratingOverviewsState, (state: RatingOverviewsState) => {
  if (state) return state.removeRating;

  return undefined;
});

export const removedRating = createSelector(removeRatingState, (state: RemoveRatingState) => {
  if (state) state.removedRating;

  return undefined;
});
export const removingRating = createSelector(removeRatingState, (state: RemoveRatingState) => {
  if (state) return state.processing;

  return undefined;
});
