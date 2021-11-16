import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { Query } from "src/app/modules/shared/common/query";
import * as fromActions from './promotion-waiters-pagination.actions';

export interface PromotionWaitersPaginationState {
  query: Query
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
}

const initialState: PromotionWaitersPaginationState = {
  query: undefined,
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PROMOTION_WAITERS_PAGE, (state, action) => {
    return { ...state, query: action.payload.query, processing: true }
  }),
  on(fromActions.FETCH_PROMOTION_WAITERS_PAGE, (state, action) => {
    return { ...state, pageResult: action.payload.result, processing: false }
  }),
  on(fromActions.SELECT_PROMOTION_WAITERS_ERROR, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  })
);

export function promotionWaitersPaginationReducer(state: PromotionWaitersPaginationState, action: Action) {
  return reducer(state, action);
}
