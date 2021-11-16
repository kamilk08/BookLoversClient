import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AddBookToShelfState } from './add-book-to-shelf.reducer';

const baseSelector = createFeatureSelector('add-book-to-shelf');

export const shelf = createSelector(baseSelector, (state: AddBookToShelfState) => {
  if (state)  return state.shelf;

  return undefined;
});

export const book = createSelector(baseSelector, (state: AddBookToShelfState) => {
  if (state)   return state.book;

  return undefined;
});

export const processing = createSelector(baseSelector, (state: AddBookToShelfState) => {
  if (state)  return state.processing;

  return undefined;
})
