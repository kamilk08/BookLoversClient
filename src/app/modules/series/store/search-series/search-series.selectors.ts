import { createSelector } from '@ngrx/store';
import { seriesState, SeriesModuleState } from '..';
import { SearchSeriesState } from './search-series.reducer';

const seriesSearch = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.searchSeries;

  return undefined;
});
export const searchedSeries = createSelector(seriesSearch, (state: SearchSeriesState) => {
  if (state) return state.entities;

  return undefined;

});
export const isBookSeriesFiltered = createSelector(seriesSearch, (state: SearchSeriesState) => {
  if (state) return state.processing;

  return undefined;
});
