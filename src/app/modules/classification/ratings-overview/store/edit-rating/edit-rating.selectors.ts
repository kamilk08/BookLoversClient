import { createSelector } from "@ngrx/store";
import { ratingOverviewsState, RatingOverviewsState } from "..";
import { EditRatingState } from "./edit-rating.reducer";

const editRatingState = createSelector(ratingOverviewsState, (state: RatingOverviewsState) => {
  if (state) return state.editRating;

  return undefined;
});

export const editingRating = createSelector(editRatingState, (state: EditRatingState) => {
  if (state) return state.processing;

  return undefined;
});

export const oldRating = createSelector(editRatingState, (state: EditRatingState) => {
  if (state) return state.oldRating;

  return undefined;
});

export const newRating = createSelector(editRatingState, (state: EditRatingState) => {
  if (state) return state.newRating;

  return undefined;
});

