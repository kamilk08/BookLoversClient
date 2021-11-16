import { Rating } from '../../../../api/ratings/models/rating.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../paginated-ratings/paginated-ratings.actions';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface PaginatedRatings {
  entities: Rating[],
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
}

const initialState: PaginatedRatings = {
  entities: undefined,
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PAGINATED_USER_RATINGS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_PAGINATED_USER_RATINGS, (state, action) => ({ ...state, entities: action.payload.ratings, pageResult: action.payload.pageResult, processing: false })),
  on(fromActions.FETCH_PAGINATED_USER_FALIURE, (state, action) => ({ ...state, error: action.payload.error }))

);

export function paginatedRatingsReducer(state: PaginatedRatings, action: Action) {
  return reducer(state, action);
}

