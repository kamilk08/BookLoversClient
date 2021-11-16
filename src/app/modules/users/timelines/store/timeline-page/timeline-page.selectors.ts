import { createSelector } from "@ngrx/store";
import { timeLinesModuleState, TimeLinesModuleState } from "..";
import { TimeLinePageState } from "./timeline-page.reducer";

const timeLinePage = createSelector(timeLinesModuleState, (state: TimeLinesModuleState) => {
  if (state) return state.timeLinePageState;

  return undefined;
});

export const timeLineId = createSelector(timeLinePage, (state: TimeLinePageState) => {
  if (state) return state.timeLineId;

  return undefined;
});
export const showHiddenActivities = createSelector(timeLinePage, (state: TimeLinePageState) => {
  if (state) return state.showHiddenActivities;

  return state.showHiddenActivities;
});
export const pageSize = createSelector(timeLinePage, (state: TimeLinePageState) => {
  if (state) return state.pageSize;

  return undefined;
});
export const currentPage = createSelector(timeLinePage, (state: TimeLinePageState) => {
  if (state) return state.currentPage + 1;

  return undefined;
});
