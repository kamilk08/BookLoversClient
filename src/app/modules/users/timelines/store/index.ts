import * as fromTimeLines from './timelines/timeline.reducer';
import * as fromToggleActivities from './hide-or-show-activity/toggle-activity.reducer';
import * as fromActivitiesPagination from './activities-pagination/activities-pagination.reducer';
import * as fromActivities from './activities/activities.reducer';
import * as fromTimeLinePage from './timeline-page/timeline-page.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface TimeLinesModuleState {
  timelinesState: fromTimeLines.TimeLinesState,
  activitiesState: fromActivities.ActivitiesState,
  activitiesPaginationState: fromActivitiesPagination.TimeLineActivitiesPagination,
  toggleActivitiesState: fromToggleActivities.ToggleActivityState,
  timeLinePageState: fromTimeLinePage.TimeLinePageState
}


const reducersMap: ActionReducerMap<TimeLinesModuleState> = {
  timelinesState: fromTimeLines.timeLineReducer,
  activitiesState: fromActivities.activitiesReducer,
  activitiesPaginationState: fromActivitiesPagination.activitiesPaginationReducer,
  toggleActivitiesState: fromToggleActivities.toggleActivityReducer,
  timeLinePageState: fromTimeLinePage.timeLinePageReducer
}

const reducer = combineReducers(reducersMap);

export function timeLineStateReducer(state: TimeLinesModuleState, action: Action) {
  return reducer(state, action);
}

export const timeLinesModuleState = createFeatureSelector('timelines');
