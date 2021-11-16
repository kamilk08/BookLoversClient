import { createSelector } from "@ngrx/store";
import { SeriesModuleState, seriesState } from "..";
import { SeriesWebPageState } from "./series-web-page.reducer";

const seriesPageState = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.pageState;

  return undefined;
});

export const seriesId = createSelector(seriesPageState, (state: SeriesWebPageState) => {
  if (state) return state.seriesId;

  return undefined;
});

export const searchPhrase = createSelector(seriesPageState, (state: SeriesWebPageState) => {
  if (state) return state.searchPhrase;

  return undefined;
});
export const sortOrder = createSelector(seriesPageState, (state: SeriesWebPageState) => {
  if (state) return state.descending;

  return undefined;
});
export const sortType = createSelector(seriesPageState, (state: SeriesWebPageState) => {
  if (state) return state.sortType;

  return undefined;
});
export const pageSize = createSelector(seriesPageState, (state: SeriesWebPageState) => {
  if (state) return state.pageSize;

  return undefined;
});

export const currentPage = createSelector(seriesPageState, (state) => {
  if (state) return state.currentPage;

  return undefined;
})
