import { createSelector } from "@ngrx/store";
import { browseMainSelector, BrowseModuleState } from '.';
import { BrowseState } from './browse.reducer';

const browseState = createSelector(browseMainSelector, (state: BrowseModuleState) => state.browsingState);

export const pageResult = createSelector(browseState, (state: BrowseState) => {
  if (state) return state.pageResult;

  return undefined;
});

export const items = createSelector(pageResult, (state) => {
  if (state) return state.items;

  return undefined;
});

export const totalItems = createSelector(pageResult, (state) => {
  if (state) return state.totalItems;

  return undefined;
});

export const currentPage = createSelector(pageResult, (state) => {
  if (state) return state.page + 1;

  return undefined;
})

export const processing = createSelector(browseState, (state: BrowseState) => {
  if (state) {
    return state.processing;
  }

  return undefined;
});


