import { Query } from 'src/app/modules/shared/common/query';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromAction from './search-series.actions';
import { Series } from '../../../api/series/models/series.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SearchSeriesState {
  entities: Series[],
  processing: boolean,
  query: Query
  error: ApiError
}

const initialState: SearchSeriesState = {
  entities: [],
  processing: false,
  query: undefined,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.START_FILTERING_SERIES, (state, action) => ({ ...state, query: action.payload.query, processing: true })),
  on(fromAction.FETCH_FILTERED_SERIES, (state, action) => ({ ...state, entities: action.payload.series })),
  on(fromAction.STOP_FILTERING_SERIES, (state) => ({ ...state, processing: false })),
  on(fromAction.FILTER_SERIES_FALIURE, (state, action) => ({ ...state, error: action.payload.error, processing: false })),
  on(fromAction.SERIES_FILTERED, (state) => ({ ...state, processing: false }))
);

export function searchSeriesReducer(state: SearchSeriesState, action: Action) {
  return reducer(state, action);
}
