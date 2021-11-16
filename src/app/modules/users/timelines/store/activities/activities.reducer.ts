import { Action, createReducer, on } from '@ngrx/store';
import { fetchMany } from 'src/app/modules/shared/common/store-extensions';
import { TimeLineActivity } from '../../../../api/timelines/models/timeline-activity.interface';
import * as fromActions from './activities.actions';

export interface ActivitiesState {
  entities: { [id: number]: TimeLineActivity },
  ids: number[],
  error: any
};

const initialState: ActivitiesState = {
  entities: {},
  ids: [],
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.FETCH_ACTIVITIES, (state, action) => {
    const newState = fetchMany((activity: TimeLineActivity) => activity.activityData.id, state, action.payload.activities);

    return { ...state, entities: newState.entities }
  }),
  on(fromActions.FETCH_ACTIVITITES_ERROR, (state, action) => {
    return { ...state, error: action.payload.error }
  }),
  on(fromActions.UPDATE_ACTIVITY, (state, action) => {
    return { ...state, entities: { ...state.entities, [action.payload.activity.activityData.id]: action.payload.activity } }
  })
);


export function activitiesReducer(state: ActivitiesState, action: Action) {
  return reducer(state, action);
}
