import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";

import * as fromActions from '../quotes-web-page/quotes-web-page.actions';

export interface QuotesWebPageState {
  bookId: number,
  quotesCount: number
  descending: boolean,
  currentPage: number
};


const initialState: QuotesWebPageState = {
  bookId: undefined,
  quotesCount: DEFAULT_ITEMS_COUNT,
  descending: true,
  currentPage: DEFAULT_PAGE
};

const reducer = createReducer(initialState,
  on(fromActions.SET_BOOK_QUOTES_ID, (state, action) => {
    return { ...state, bookId: action.payload.bookId }
  }),
  on(fromActions.CHANGE_BOOK_QUOTES_SORT_ORDER, (state, action) => {
    return { ...state, descending: action.payload.descending }
  }),
  on(fromActions.CHANGE_BOOK_QUOTES_PAGE, (state, action) => {
    return { ...state, currentPage: action.payload.page }
  })
);

export function quotesWebPageReducer(state: QuotesWebPageState, action: Action) {
  return reducer(state, action);
}
