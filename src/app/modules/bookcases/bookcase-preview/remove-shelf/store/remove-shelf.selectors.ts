import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RemoveShelfState } from './remove-shelf.reducer';

const baseSelector = createFeatureSelector('remove-shelf');

export const shelfToRemove$ = createSelector(baseSelector, (state: RemoveShelfState) => {
  if (state) {
    return state.shelf;
  }

  return undefined;
});

export const processing$ = createSelector(baseSelector, (state: RemoveShelfState) => {
  if (state) {
    return state.processing;
  }

  return undefined;
});
