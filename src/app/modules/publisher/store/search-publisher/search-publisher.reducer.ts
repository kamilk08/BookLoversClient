import { Query } from 'src/app/modules/shared/common/query';
import { createReducer, on, Action } from '@ngrx/store';
import * as searchPublisherAction from './search-publisher.actions';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SearchPublisherState {
  entities: Publisher[]
  processing: boolean,
  query: Query
  error: ApiError
}

const initialState: SearchPublisherState = {
  entities: [],
  processing: false,
  query: undefined,
  error: undefined
};

const reducer = createReducer(initialState,
  on(searchPublisherAction.START_FILTERING_PUBLISHERS, (state, action) => ({ ...state, processing: true, query: action.payload.query })),
  on(searchPublisherAction.STOP_FILTERING_PUBLISHERS, state => ({ ...state, processing: false })),
  on(searchPublisherAction.FETCH_FILTERED_PUBLISHERS, (state, action) => ({ ...state, processing: false, entities: action.payload.publishers })),
  on(searchPublisherAction.FILTER_PUBLISHER_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function searchPublisherReducer(state: SearchPublisherState, action: Action) {
  return reducer(state, action);
}

