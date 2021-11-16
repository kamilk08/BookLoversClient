import { createSelector } from "@ngrx/store";
import { authorsModuleState, AuthorsModuleState } from "..";

const authorBooksState = createSelector(authorsModuleState, (state: AuthorsModuleState) => {
  if (state) return state.authorBooks;

  return undefined;
});

export const authorBooksPageResult = createSelector(authorBooksState, (state) => {
  if (state) return state.pageResult;

  return undefined;
});

export const authorBooksIds = createSelector(authorBooksPageResult, (state) => {
  if (state) return state.items;

  return undefined;
})

export const processingAuthorBooks = createSelector(authorBooksState, (state) => {
  if (state) return state.processing;

  return undefined;
})
