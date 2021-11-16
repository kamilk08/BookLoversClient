import { Action, createReducer, on } from '@ngrx/store';
import { SortType } from 'src/app/modules/shared/common/sort-type';

import * as fromActions from './book-webpage.actions';
import { DEFAULT_ITEMS_COUNT } from 'src/app/modules/shared/common/query';
import { SORT_REVIEWS_BY_DATE } from 'src/app/modules/users/reviews/models/reviews-sort-type';


export interface BookWebPageState {
  bookId: number
  sortType: SortType,
  descending: boolean
  reviewsCount: number
  quotesCount: number,
  seriesCount: number,
  authorBooksCount: number
}

const initialState: BookWebPageState = {
  bookId: undefined,
  sortType: SORT_REVIEWS_BY_DATE,
  descending: true,
  reviewsCount: DEFAULT_ITEMS_COUNT,
  quotesCount: 3,
  seriesCount: 6,
  authorBooksCount: 8
};

const reducer = createReducer(initialState,
  on(fromActions.SET_BOOK_ID, (state, action) => ({ ...state, bookId: action.payload.bookId })),
  on(fromActions.CHANGE_REVIEWS_SORT_TYPE, (state, action) => ({ ...state, sortType: action.payload.sortType })),
  on(fromActions.CHANGE_REVIEWS_SORT_ORDER, (state, action) => ({ ...state, descending: action.payload.descending })),
  on(fromActions.CHANGE_REVIEWS_PAGE, (state, action) => ({ ...state, currentPage: action.payload.page }))
);

export function webPageReducer(state: BookWebPageState, action: Action) {
  return reducer(state, action);
}
