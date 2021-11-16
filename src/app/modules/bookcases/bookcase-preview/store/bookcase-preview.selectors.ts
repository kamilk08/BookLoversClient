import { createSelector } from '@ngrx/store';
import { baseBookcasePreivewSelector, BookcasePreviewState } from ".";
import { ManageBookcase } from './bookcase-preview.reducer';

const baseSelector = createSelector(baseBookcasePreivewSelector, (state: BookcasePreviewState) => {
  if (state) return state.manageBookcaseState;

  return undefined;
});

export const bookcasePreview = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.bookcase;

  return undefined;
});

export const isProcessingBookcase = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.processing;

  return undefined;
});

export const bookId = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.bookId;

  return undefined;
});

export const selectedShelf = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.selectedShelf;

  return undefined;
});

export const removedShelfTag = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.removedShelfTag;

  return undefined;
})

export const avaliableShelves = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.availableShelves

  return undefined;
});

export const currentShelfTags = createSelector(baseSelector, (state: ManageBookcase) => {
  if (state) return state.currentShelfTags;

  return undefined;
});
