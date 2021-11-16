import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";

import * as fromActions from './publisher-books.actions';

export interface PublisherBooksState {
  pageResult: PageResult
  processing: boolean
  error: ApiError
};

const initialState: PublisherBooksState = {
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PUBLISHER_BOOKS, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.FETCH_PUBLISHER_BOOKS, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult, processing: false }
  }),
  on(fromActions.FETCH_PUBLISHER_BOOKS_ERROR, (state, action) => {
    return { ...state, error: action.payload.error }
  })
);

export function publisherBooksStateReducer(state: PublisherBooksState, action: Action) {
  return reducer(state, action);
}
