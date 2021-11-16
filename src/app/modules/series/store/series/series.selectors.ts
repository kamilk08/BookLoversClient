import { createSelector } from '@ngrx/store';
import { seriesState, SeriesModuleState } from '..';
import { SeriesState } from './series.reducer';

const series = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.series;

  return undefined;
});

export const seriesById = (seriesId: number) => createSelector(series, (state: SeriesState) => {
  if (state && seriesId) {
    return state.entities[seriesId];
  }

  return undefined;
});

export const multipleSeries = (seriesIds: number[]) => createSelector(series, (state: SeriesState) => {
  if (state && seriesIds) {
    const entities = seriesIds.map(id => state.entities[id])
    .filter(f => f !== undefined);

    return entities;
  }

  return undefined;
})

export const seriesByBookId = (bookId: number) => createSelector(series, (state: SeriesState) => {
  if (state && bookId) {
    const entities = state.ids.map(id => state.entities[id]);
    const series = entities.find(p => p.books.some(a => a === bookId));
    return series;
  }

  return undefined;
});

export const seriesTitle = (seriesId) => createSelector(seriesById(seriesId), (state) => {
  if (state) return state.seriesName;

  return undefined;
})

export const seriesBooksCount = (seriesId: number) => createSelector(seriesById(seriesId), (state) => {
  if (state) return state.books.length;

  return undefined;

});

export const otherBooksInSeries = (bookId: number) => createSelector(seriesByBookId(bookId), (state) => {
  if (state) return state.books.filter(f => f !== bookId)

  return undefined;
})

export const isProcessingSeries = createSelector(series, (state: SeriesState) => {
  if (state) return state.processing;

  return undefined;
});

export const fetchError = createSelector(series, (state: SeriesState) => {
  if (state) return state.error;

  return undefined;
})




