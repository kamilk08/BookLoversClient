import { createSelector } from "@ngrx/store";
import { booksModuleState, BooksModuleState } from "..";
import { SearchBook } from "./search-book.reducer";

const booksSearchState = createSelector(booksModuleState, (state: BooksModuleState) => {
  if (state) return state.searchBook;

  return undefined;
});

export const searchedBooksByTitle = createSelector(booksSearchState, (state: SearchBook) => {
  if (state) return state.entities;

  return undefined;
})

export const isBookSearched = createSelector(booksSearchState, (state: SearchBook) => {
  if (state) return state.processing;

  return undefined;
});
export const searchQuery = createSelector(booksSearchState, (state: SearchBook) => {
  if (state) return state.query;

  return undefined;
});
