import { createSelector } from "@ngrx/store";
import { baseSelector, RemoveBookcaseBookState } from '.';
import { RemoveBookFromBookcaseState } from './remove-book-from-bookcase.reducer';
import { RemoveBookFromShelfState } from './remove-book-from-shelf.reducer';

const removeBookFromShelfState = createSelector(baseSelector, (state: RemoveBookcaseBookState) => {
  if (state) return state.removeBookFromShelfState;

  return undefined;
});

export const bookRemovedFromShelf = createSelector(removeBookFromShelfState, (state: RemoveBookFromShelfState) => {
  if (state) return state.book;

  return undefined;
});
export const shelfThahContainsBook = createSelector(removeBookFromShelfState, (state: RemoveBookFromShelfState) => {
  if (state) return state.shelf;

  return undefined;
});

const removeBookFromBookcaseState = createSelector(baseSelector, (state: RemoveBookcaseBookState) => {
  if (state) return state.removeBookFromBookcaseState;

  return undefined;
});

export const removedBook = createSelector(removeBookFromBookcaseState, (state: RemoveBookFromBookcaseState) => {
  if(state) return state.book;

  return undefined;
});
