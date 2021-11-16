import { createSelector } from "@ngrx/store";
import { timeLinesModuleState, TimeLinesModuleState } from "..";
import { ToggleActivityState } from "./toggle-activity.reducer";

const toggleActivitiesState = createSelector(timeLinesModuleState, (state: TimeLinesModuleState) => {
  if (state) return state.toggleActivitiesState;

  return undefined;
});

export const toggledAcitivty = createSelector(toggleActivitiesState, (state: ToggleActivityState) => {
  if (state) return state.activity;

  return undefined;
});
