import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from '../../api/api-error.model';
import { PageResult } from '../../shared/common/page-result';
import * as fromActions from './browse.actions';

export interface BrowseState {
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
};

const initialState: BrowseState = {
  pageResult: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.START_BROWSING, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.FETCH_BROWSING_RESULTS, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult }
  }),
  on(fromActions.FINISH_BROWSING, (state) => ({ ...state, processing: false })),
  on(fromActions.FETCH_BROWSING_RESULTS_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function browseReducer(state: BrowseState, action: Action) {
  return reducer(state, action);
};
