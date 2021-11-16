import { createSelector } from "@ngrx/store";
import { seriesState, SeriesModuleState } from "..";

const booksPagination = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.booksPagination;

  return undefined;
});

export const seriesBooksPageResult = createSelector(booksPagination, (state) => {
  if (state) return state.pageResult;

  return undefined;
});

export const seriesBooksIds = createSelector(seriesBooksPageResult, (state) => {
  if (state) return state.items
});

export const processingSeriesBooks = createSelector(booksPagination, (state) => {
  if (state) return state.processing;

  return undefined;
})
