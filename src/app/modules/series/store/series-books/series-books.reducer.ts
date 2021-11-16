import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";

import * as fromActions from './series-books.actions';

export interface SeriesBooksState {
  pageResult: PageResult
  processing: boolean
  error: ApiError
};

const initialState: SeriesBooksState = {
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_SERIES_BOOKS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_SERIES_BOOKS, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult, processing: false }
  }),
  on(fromActions.FETCH_SERIES_BOOKS_ERROR, (state, action) => ({ ...state, error: action.payload.error }))
);

export function seriesBooksStateReducer(state: SeriesBooksState, action: Action) {
  return reducer(state, action);
}
