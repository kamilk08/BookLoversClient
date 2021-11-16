import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";

import * as fromActions from './author-books.actions';

export interface AuthorBooksState {
  pageResult: PageResult
  processing: boolean
  error: ApiError
};

const initialState: AuthorBooksState = {
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_AUTHOR_BOOKS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_AUTHOR_BOOKS, (state, action) => ({ ...state, pageResult: action.payload.pageResult, processing: false })),
  on(fromActions.FETCH_AUTHOR_BOOKS_ERROR, (state, action) => ({ ...state, error: action.payload.error }))
);

export function authorBooksReducer(state: AuthorBooksState, action: Action) {
  return reducer(state, action);
}
