import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import * as fromActions from './search-reader.actions';


export interface SearchReaderState {
  query: Query
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
}

const initialState: SearchReaderState = {
  query: undefined,
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SEARCH_READERS, (state, action) => {
    return { ...state, query: action.payload.query, processing: true }
  }),
  on(fromActions.SET_READERS_PAGE, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult, processing: false }
  }),
  on(fromActions.SEARCH_READERS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function searchReaderReducer(state: SearchReaderState, action: Action) {
  return reducer(state, action);
}
