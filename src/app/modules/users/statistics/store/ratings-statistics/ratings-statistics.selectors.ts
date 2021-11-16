import { createSelector } from "@ngrx/store";
import { readerStatisticsModuleSelector, ReaderStatisticsModuleState } from "..";
import { ReaderRatingsStatisticsState } from "./ratings-statistics.reducer";

const readerRatingsStatisticsState = createSelector(readerStatisticsModuleSelector, (state: ReaderStatisticsModuleState) => {
  if (state) return state.ratingsStatistics;

  return undefined;
});

export const readerRatingsStatistics = (readerId: number) => createSelector(readerRatingsStatisticsState, (state: ReaderRatingsStatisticsState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
})
