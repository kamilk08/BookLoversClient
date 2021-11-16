import { createSelector } from "@ngrx/store";
import { AddAuthorModuleState, addAuthorModuleState } from '..';
import { AddAuthorState } from './add-author.reducer';

const addAuthorState = createSelector(addAuthorModuleState, (state: AddAuthorModuleState) => {
  if (state) return state.addAuthor;

  return undefined;
});

export const processingNewAuthor = createSelector(addAuthorState, (state: AddAuthorState) => {
  if (state) return state.processing;

  return undefined;
});

export const authorId = createSelector(addAuthorState, (state: AddAuthorState) => {
  if (state) return state.authorId;

  return undefined;
});

export const success = createSelector(addAuthorState, (state: AddAuthorState) => {
  if (state) return state.success;

  return undefined;
});
