import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import * as fromActions from './add-publisher.actions';

export interface AddPublisherState {
  addedPublisher: Publisher
  processing: boolean
  error: ApiError
}

const initialState: AddPublisherState = {
  addedPublisher: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_PUBLISHER, (state, action) => {
    return { ...state, addedPublisher: action.payload.publisher, processing: true }
  }),
  on(fromActions.ADD_PUBLISHER_SUCCESS, (state, action) => {
    const publisher = state.addedPublisher;
    publisher.setPublisherId(action.payload.publisherId);

    return { ...state, addedPublisher: publisher, processing: false }
  }),
  on(fromActions.ADD_PUBLISHER_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function addPublisherReducer(state: AddPublisherState, action: Action) {
  return reducer(state, action);
}
