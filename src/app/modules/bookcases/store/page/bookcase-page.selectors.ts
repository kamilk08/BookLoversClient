import { createSelector } from "@ngrx/store";
import { bookcaseModuleState, BookcaseModuleState } from "..";
import { BookcasePageState } from "./bookcase-page.reducer";

const bookcasePageState = createSelector(bookcaseModuleState, (state: BookcaseModuleState) => {
  if (state) return state.bookcasePageState

  return undefined;
});

export const readerId = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.readerId;

  return undefined;
});

export const currentBookcase = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.currentBookcase;

  return undefined;
});

export const currentBookIds = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.currentBookIds;

  return undefined;
});

export const sortType = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.sortType;

  return undefined;
});

export const sortOrder = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.descending;

  return undefined;
});

export const searchPhrase = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.searchPhrase;

  return undefined;
});

export const selectedShelves = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.selectedShelves;

  return undefined;
});


export const showSearchBar = createSelector(bookcasePageState, (state: BookcasePageState) => {
  if (state) return state.showSearchBar

  return undefined;
});
