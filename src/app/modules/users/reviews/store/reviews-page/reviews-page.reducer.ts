import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import * as fromActions from './reviews-page.actions';

export interface ReviewsPageState {
  readerId: number,
  pageSize: number
}

const initialState: ReviewsPageState = {
  readerId: undefined,
  pageSize: DEFAULT_ITEMS_COUNT,
}

const reducer = createReducer(initialState,
  on(fromActions.SET_READER_ID_ON_REVIEWS_PAGE, (state, action) => ({ ...state, readerId: action.payload.readerId })),
  on(fromActions.SET_REVIEWS_PAGE_SIZE, (state, action) => ({ ...state, pageSize: action.payload.pageSize })),
  on(fromActions.NEXT_REVIEWS_PAGE, (state) => ({ ...state }))
);

export function reviewsPageReducer(state: ReviewsPageState, action: Action) {
  return reducer(state, action);
}
