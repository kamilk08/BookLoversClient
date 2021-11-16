import { createSelector } from "@ngrx/store";
import { quotesState, QuotesState } from "..";
import { QuotesWebPageState } from "./quotes-web-page.reducer";

const webPage = createSelector(quotesState, (state: QuotesState) => {
  if (state) return state.webPage;

  return undefined;
});

export const bookId = createSelector(webPage, (state: QuotesWebPageState) => {
  if (state) return state.bookId;

  return undefined;
})

export const descending = createSelector(webPage, (state: QuotesWebPageState) => {
  if (state) return state.descending;

  return undefined;
});

export const qoutesCount = createSelector(webPage, (state: QuotesWebPageState) => {
  if (state) return state.quotesCount;

  return undefined;
});

export const currentPage = createSelector(webPage, (state: QuotesWebPageState) => {
  if (state) return state.currentPage;

  return undefined;
});
