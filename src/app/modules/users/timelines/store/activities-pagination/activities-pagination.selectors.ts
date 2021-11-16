import { createSelector } from "@ngrx/store";
import { timeLinesModuleState, TimeLinesModuleState } from "..";
import { TimeLineActivitiesPagination } from "./activities-pagination.reducer";

const activitiesPaginationState = createSelector(timeLinesModuleState, (state: TimeLinesModuleState) => {
  if (state) return state.activitiesPaginationState;

  return undefined;
});

export const activitiesPageResult = createSelector(activitiesPaginationState, (state: TimeLineActivitiesPagination) => {
  if (state) {
    return state.pageResult;
  }

  return undefined;
});

export const isProcessingActivitiesPage = createSelector(activitiesPaginationState, (state: TimeLineActivitiesPagination) => {
  if (state) {
    return state.processing;
  }

  return undefined;
});


export const hasTimeLineActvities = createSelector(activitiesPageResult, (state) => {
  if (state) return state.totalItems > 0;

  return undefined;
})

