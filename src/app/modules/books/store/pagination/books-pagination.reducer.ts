import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './books-pagination.actions';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface BooksPagination {
  pageResult: PageResult,
  processing: boolean
  error: ApiError
}

const initialState: BooksPagination = {
  pageResult: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_BOOKS_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SET_BOOKS_PAGE, (state, action) => ({
    ...state,
    pageResult: action.payload.pageResult
  })),
  on(fromActions.SET_BOOKS_PAGE_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.SET_BOOKS_PAGE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
)

export function booksPaginationReducer(state: BooksPagination, action: Action) {
  return reducer(state, action);
}
