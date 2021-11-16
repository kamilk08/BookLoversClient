import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EditShelfState } from './edit-shelf.reducer';

const baseSelector = createFeatureSelector('edit-shelf');

export const shelf = createSelector(baseSelector, (state: EditShelfState) => {
  if (state) return state.shelf;

  return undefined;
});
export const shelfName = createSelector(baseSelector, (state: EditShelfState) => {
  if(state) return state.shelfName;

  return undefined;
});

