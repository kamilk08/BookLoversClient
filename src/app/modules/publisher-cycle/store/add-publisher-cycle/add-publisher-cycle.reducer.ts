import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import * as fromActions from './add-publisher-cycle.actions';

export interface AddPublisherCycleState {
  publisherCycle: PublisherCycle
  processing: boolean
  error: ApiError
}

const initialState: AddPublisherCycleState = {
  publisherCycle: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_PUBLISHER_CYCLE, (state, action) => {
    return { ...state, publisherCycle: action.payload.publisherCycle, processing: true }
  }),
  on(fromActions.ADD_PUBLISHER_CYCLE_SUCCESS, (state, action) => {
    const publisherCycle = state.publisherCycle;
    publisherCycle.setPublisherCycleId(action.payload.publisherCycleId);

    return { ...state, publisherCycle: publisherCycle, processing: false }
  }),
  on(fromActions.ADD_PUBLISHER_CYCLE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model }
  })
);

export function addPublisherCycleReducer(state: AddPublisherCycleState, action: Action) {
  return reducer(state, action);
}
