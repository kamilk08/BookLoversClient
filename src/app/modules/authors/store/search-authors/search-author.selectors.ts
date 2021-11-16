import { createSelector } from "@ngrx/store";
import { AuthorsModuleState, authorsModuleState } from "..";
import { SearchAuthor } from "./search-author.reducer";

const authorsSearchState = createSelector(authorsModuleState, (state: AuthorsModuleState) => {
  if (state) return state.searchAuthor;

  return undefined;
});

export const searchedAuthors = createSelector(authorsSearchState, (state: SearchAuthor) => {
  if (state) return state.entities;
  return undefined;
});
export const isAuthorFiltered = createSelector(authorsSearchState, (state: SearchAuthor) => {
  if (state) return state.isFiltered;

  return undefined;
});
