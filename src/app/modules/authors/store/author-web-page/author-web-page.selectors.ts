import { createSelector } from "@ngrx/store";
import { authorsModuleState, AuthorsModuleState } from "..";
import { AuthorWebPageState } from "./author-web-page.reducer";

const authorWebPageState = createSelector(authorsModuleState, (state: AuthorsModuleState) => {
  if (state) return state.authorWebPage;

  return undefined;
});

export const authorId = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.authorId;

  return undefined;
});
export const maxQuotesCount = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.qoutesCount;

  return undefined;
});
export const maxBooksCount = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.booksCount;

  return undefined;
});
export const maxSeriesCount = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.seriesCount;

  return undefined;
});
export const maxSeriesBooksCount = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.seriesBooksCount;

  return undefined;
});

export const currentBooksPage = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.booksPage;

  return undefined;
});
export const currentSeriesPage = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.seriesPage;

  return undefined;
});
export const searchPhrase = createSelector(authorWebPageState, (state: AuthorWebPageState) => {
  if (state) return state.searchPhrase;

  return undefined;
});
