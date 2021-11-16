import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { TimeLineActivity } from '../../../../api/timelines/models/timeline-activity.interface';
import * as fromActions from './toggle-activity.actions';

export interface ToggleActivityState {
  activity: TimeLineActivity,
  processing: boolean,
  error: ApiError
};

const initialState: ToggleActivityState = {
  activity: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.HIDE_ACTIVITY, (state, action) => {
    return { ...state, activity: action.payload.activity, processing: true }
  }),
  on(fromActions.HIDE_ACTIVITY_SUCCESS, (state) => {
    const activity = state.activity;
    activity.show = false;

    return { ...state, activity: activity, processing: false }
  }),
  on(fromActions.HIDE_ACTIVITY_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  }),
  on(fromActions.SHOW_ACTIVITY, (state, action) => {
    return { ...state, activity: action.payload.activity, processing: true }
  }),
  on(fromActions.SHOW_ACTIVITY_SUCCESS, (state) => {
    const activity = state.activity;
    activity.show = true;

    return { ...state, activity: activity, processing: false }
  }),
  on(fromActions.SHOW_ACTIVITY_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function toggleActivityReducer(state: ToggleActivityState = initialState, action: Action) {
  return reducer(state, action);
}
