import { createSelector } from "@ngrx/store";
import { booksModuleState, BooksModuleState } from "..";
import { RemoveBookState } from "../remove-book/remove-book.reducer";
import { BookWebPageState } from "./book-webpage.reducer";

const webPageState = createSelector(booksModuleState, (state: BooksModuleState) => {
  if (state) return state.webPage;

  return undefined;
});

export const bookId = createSelector(webPageState, (state) => {
  if (state) return state.bookId;

  return undefined;
});

export const reviewsCount = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.reviewsCount;

  return undefined;

});
export const quotesCount = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.quotesCount;

  return undefined;
});

export const seriesCount = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.seriesCount;

  return undefined;
});

export const authorBooksCount = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.authorBooksCount;

  return undefined;
})

export const sortType = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.sortType;

  return undefined;
});
export const descending = createSelector(webPageState, (state: BookWebPageState) => {
  if (state) return state.descending;

  return undefined;
});

const removeBookState = createSelector(booksModuleState, (state: BooksModuleState) => {
  if (state) {
    return state.removeBook
  };
  return undefined;
});

export const removedBook = createSelector(removeBookState, (state: RemoveBookState) => {
  if (state) return state.book;

  return undefined;
})
