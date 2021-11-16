import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChangeShelfState } from './change-shelf.reducer';

const baseSelector = createFeatureSelector('change-shelf');

export const oldShelf = createSelector(baseSelector, (state: ChangeShelfState) => {
  if (state) {
    return state.oldShelf;
  }

  return undefined;
});

export const newShelf = createSelector(baseSelector, (state: ChangeShelfState) => {
  if (state) {
    return state.shelf;
  }

  return undefined;
});

export const book = createSelector(baseSelector, (state: ChangeShelfState) => {
  if (state) {
    return state.book;
  }

  return undefined;
});
