import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AddShelfState } from './add-custom-shelf.reducer';

const baseSelector = createFeatureSelector('add-shelf');

export const isProcessing = createSelector(baseSelector, (state: AddShelfState) => {
  if (state) {
    return state.processing;
  }
  return undefined;
});
export const addedShelf = createSelector(baseSelector, (state: AddShelfState) => {
  if (state) {
    return state.shelf
  }

  return undefined;
});
export const error = createSelector(baseSelector, (state: AddShelfState) => {
  if (state) {
    return state.error;
  }

  return undefined;
});
