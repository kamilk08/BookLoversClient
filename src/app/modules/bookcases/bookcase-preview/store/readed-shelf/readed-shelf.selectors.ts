import { createSelector } from "@ngrx/store";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { baseBookcasePreivewSelector, BookcasePreviewState } from "..";
import { ReadedShelfState } from "./readed-shelf.reducer";

const baseSelector = createSelector(baseBookcasePreivewSelector, (state: BookcasePreviewState) => {
  if (state) return state.readedShelfState;

  return undefined;
});

export const ratingForm = createSelector(baseSelector, (state: ReadedShelfState) => {
  if (state) return state.ratingForm;

  return undefined;
});

export const reviewForm = createSelector(baseSelector, (state: ReadedShelfState) => {
  if (state) return state.reviewForm;

  return undefined;
});

export const comment = createSelector(reviewForm, (state) => {
  if (state) return state.get('comment').value;

  return undefined;
});

export const spoilerCommnet = createSelector(reviewForm, (state) => {
  if (state) return state.get('spoilerComment').value as boolean;

  return undefined;
});

export const hasReview = createSelector(reviewForm, (state) => {
  if (state) return state.get('hasReview').value as boolean;

  return undefined;
});

export const oldReview = createSelector(reviewForm, (state) => {
  if (state) return state.get('oldReview').value as Review;

  return undefined;
});

export const selectedGrade = createSelector(ratingForm, (state) => {
  if (state) return state.get('selectedGrade');

  return undefined;
});

export const oldGrade = createSelector(ratingForm, (state) => {
  if (state) return state.get('oldGrade').value as Rating;

  return undefined;
});

