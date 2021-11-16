import { createSelector } from "@ngrx/store";
import { TimeLinesModuleState, timeLinesModuleState } from "..";

import { TimeLinesState } from './timeline.reducer';

const timelinesState = createSelector(timeLinesModuleState, (state: TimeLinesModuleState) => {
  if (state) return state.timelinesState;

  return undefined;
});

export const getTimeLineById = (timelineId: number) => createSelector(timelinesState, (state: TimeLinesState) => {
  if (state && timelineId) {
    return state.entities[timelineId];
  }

  return undefined;
});

export const getReaderTimeLine = (readerId: number) => createSelector(timelinesState, (state: TimeLinesState) => {
  if (state && readerId) {
    const entities = state.ids.map(id => state.entities[id]);
    return entities.find(f => f.readerId === readerId);
  };

  return undefined;
});

export const error = createSelector(timelinesState, (state) => {
  if (state) return state.error;

  return undefined;
})



