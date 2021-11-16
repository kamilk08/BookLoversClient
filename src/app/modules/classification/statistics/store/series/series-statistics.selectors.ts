import { createSelector } from "@ngrx/store";
import { statisticsState, StatisticsState } from "..";
import { SeriesStatistics } from "./series-statistics.reducer";

const seriesStatisticsState = createSelector(statisticsState, (state: StatisticsState) => {
  if (state) return state.seriesStatistics;

  return undefined;
});


export const seriesStatistics = (seriesId: number) => createSelector(seriesStatisticsState, (state: SeriesStatistics) => {
  if (state && seriesId) {
    return state.entities[seriesId];
  }

  return undefined;
});

export const seriesAverage = (seriesId: number) => createSelector(seriesStatistics(seriesId), (state) => {
  if (state) return state.average;

  return undefined;
});

export const seriesRatingsCount = (seriesId: number) => createSelector(seriesStatistics(seriesId), (state) => {
  if (state) return state.ratingsCount;

  return undefined;
})
