import { createSelector } from "@ngrx/store";
import { ratingOverviewsState, RatingOverviewsState } from "..";
import { AddRatingState } from "./add-rating.reducer";


const addRatingState = createSelector(ratingOverviewsState, (state: RatingOverviewsState) => {
  if (state) return state.addRating;

  return undefined;
});

export const addedRating = createSelector(addRatingState, (state: AddRatingState) => state.rating);
export const processingNewRating = createSelector(addRatingState, (state: AddRatingState) => state.processing);
