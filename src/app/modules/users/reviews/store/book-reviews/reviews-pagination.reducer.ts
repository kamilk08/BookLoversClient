import { createReducer, on, Action } from '@ngrx/store';
import * as fromAction from './reviews-pagination.actions';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface BookPaginatedReviews {
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
}

const initialState: BookPaginatedReviews = {
  pageResult: {
    items: [], page: 0, pagesCount: 0, totalItems: 0
  },
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.SELECT_BOOK_REVIEWS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromAction.SET_BOOK_REVIEWS_PAGE, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult, processing: false }
  }),
  on(fromAction.REVIEWS_PAGE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function paginatedReviewsReducer(state: BookPaginatedReviews, action: Action) {
  return reducer(state, action);
}
