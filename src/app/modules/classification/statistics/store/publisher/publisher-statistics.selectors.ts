import { createSelector } from "@ngrx/store";
import { statisticsState, StatisticsState } from "..";
import { PublisherStatistics } from "./publisher-statistics.reducer";

const publisherStatisticsState = createSelector(statisticsState, (state: StatisticsState) => {
  if (state) return state.publisherStatistics;

  return undefined;
});


export const publisherStatistics = (publisherId: number) => createSelector(publisherStatisticsState, (state: PublisherStatistics) => {
  if (state && publisherId) {
    return state.entities[publisherId];
  }

  return undefined;
});

export const publisherAverage = (publisherId: number) => createSelector(publisherStatistics(publisherId), (state) => {
  if (state) {
    return state.average;
  }

  return undefined;
})
