import { createSelector } from "@ngrx/store";
import { statisticsState, StatisticsState } from "..";
import { AuthorStatistics } from "./author-statistics.reducer";

const authorStatisticsState = createSelector(statisticsState, (state: StatisticsState) => {
  if (state) return state.authorsStatistics;

  return undefined;
});

export const authorStatistics = (authorId: number) => createSelector(authorStatisticsState, (state: AuthorStatistics) => {
  if (state && authorId) {
    return state.entities[authorId];
  }

  return undefined;
});

export const authorsAverage = (authorId: number) => createSelector(authorStatistics(authorId), (state) => {
  if (state) {
    return state === undefined ? 0.00 : state.average
  }
})
