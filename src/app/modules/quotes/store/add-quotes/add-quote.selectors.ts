import { createSelector } from "@ngrx/store";
import { quotesState, QuotesState } from "..";
import { AddQuoteState } from './add-quote.reducer';

const addQuoteState = createSelector(quotesState, (state: QuotesState) => {
  if (state) return state.addQuote;

  return undefined;
});

export const addedQuote = createSelector(addQuoteState, (state: AddQuoteState) => {
  if (state) return state.quote;

  return undefined;
});
export const processingNewQuote = createSelector(addQuoteState, (state: AddQuoteState) => {
  if (state) return state.processing;

  return undefined;
});

