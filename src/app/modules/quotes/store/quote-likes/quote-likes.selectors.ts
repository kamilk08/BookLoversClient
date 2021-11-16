import { createSelector } from "@ngrx/store";
import { QuotesState, quotesState } from '..';
import { QuoteLikesState } from './quote-likes.reducer';

const quoteLikesState = createSelector(quotesState, (state: QuotesState) => {
  if (state) return state.quoteLikes;

  return undefined;
});

export const likedQuote = createSelector(quoteLikesState, (state: QuoteLikesState) => {
  if (state) return state.quote;

  return undefined;
});
export const processingNewLike = createSelector(quoteLikesState, (state: QuoteLikesState) => {
  if (state) return state.processing;

  return undefined;
});
