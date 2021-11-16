import { createSelector } from "@ngrx/store";
import { timeLinesModuleState, TimeLinesModuleState } from "..";
import { ActivitiesState } from "./activities.reducer";

const activitiesState = createSelector(timeLinesModuleState, (state: TimeLinesModuleState) => {
  if (state) return state.activitiesState;

  return undefined;
});

export const getActivities = (ids: number[], showHidden: boolean) => createSelector(activitiesState, (state: ActivitiesState) => {
  if (state && ids) {
    let activities = state.ids.filter(id => ids.includes(id)).map(id => state.entities[id]);
    return showHidden ? activities.orderByDescending(p=>p.date) : activities.filter(f => f.show === true).orderByDescending(p => p.date);
  }

  return undefined;
});
