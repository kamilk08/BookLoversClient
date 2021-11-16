import { createSelector } from "@ngrx/store";
import { SeriesModuleState, seriesState } from '..';
import { AddSeriesState } from './add-series.reducer';


const addSeriesState = createSelector(seriesState, (state: SeriesModuleState) => {
  if (state) return state.addSeries;

  return undefined;
});

export const addedSeries = createSelector(addSeriesState, (state: AddSeriesState) => {
  if (state) return state.series;

  return undefined;
});

