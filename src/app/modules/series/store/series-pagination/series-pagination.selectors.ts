import { createSelector } from '@ngrx/store';
import { seriesState, SeriesModuleState } from '..';
import { SeriesPaginationState } from './series-pagination.reducer';

const seriesPagination = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.seriesPagination;

  return undefined;
});

export const paginatedSeries = createSelector(seriesPagination, (state: SeriesPaginationState) => {
  if (state) return state.entities;

  return undefined;
});
export const seriesPageResult = createSelector(seriesPagination, (state: SeriesPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});

//+1 IS ADDED BECAUSE FIRST PAGE HAS ZERO INDEX
//AND CLIENT PAGINATION STARTS FROM PAGE INDEX = 1;
export const currentSeriesPage = createSelector(seriesPagination, (state: SeriesPaginationState) => {
  if (state && state.pageResult) {
    return state.pageResult.page + 1;
  }

});

export const totalItems = createSelector(seriesPagination, (state: SeriesPaginationState) => {
  if (state && state.pageResult) {
    return state.pageResult.totalItems;
  };
})

export const isProcessingSeriesPage = createSelector(seriesPagination, (state: SeriesPaginationState) => {
  if (state) return state.processing;

  return undefined;
});
