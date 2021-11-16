import { createSelector } from "@ngrx/store";
import { BookcaseStatisticsState, bookcaseStatisticsModuleState } from ".";
import { BookcasesWithBook } from "./bookcases-with-book.reducer";

const bookcasesWithBookState = createSelector(bookcaseStatisticsModuleState, (state: BookcaseStatisticsState) => {
  if (state) return state.bookcasesWithBook;

  return undefined;
});

export const bookcasesWithBook = (bookId: number) => createSelector(bookcasesWithBookState, (state: BookcasesWithBook) => {
  if (state && bookId) {
    return state.entities[bookId];
  }

  return undefined;
})

export const bookInBookcases = (bookId: number) => createSelector(bookcasesWithBook(bookId), (state) => {
  if (state) return state.length;

  return undefined;
})
