import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult, ReviewsPageResult } from 'src/app/modules/shared/common/page-result';
import * as fromActions from './reader-reviews-pagination.actions';

export interface ReaderPaginatedReviewsState {
  entities: { [readerId: number]: PageResult },
  ids: number[]
  processing: boolean,
  error: ApiError
};

const initialState: ReaderPaginatedReviewsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_READER_REVIEWS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.SET_READER_REVIEWS_PAGE, (state, action) => {
    const ids = state.ids;
    if (!ids.includes(action.payload.readerId))
      ids.push(action.payload.readerId);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.pageResult }, ids: ids }
  }),
  on(fromActions.REORDER_READER_REVIEWS_PAGE, (state, action) => {
    const pageResult = state.entities[action.payload.readerId] as ReviewsPageResult;
    pageResult.sortType = action.payload.query.sortType;
    pageResult.sortOrder = action.payload.query.descending

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: pageResult } }
  }),
  on(fromActions.REVIEWS_PAGE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  }),
  on(fromActions.READER_REVIEWS_PAGE_SELECTED, (state) => ({ ...state, processing: false }))
);

export function readerReviewsPaginationReducer(state: ReaderPaginatedReviewsState, action: Action) {
  return reducer(state, action);
}

