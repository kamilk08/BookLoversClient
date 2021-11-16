import { PageResult } from 'src/app/modules/shared/common/page-result';
import { createReducer, on, Action, ActionReducerMap, combineReducers } from '@ngrx/store';
import * as fromActions from './quotes-pagination.actions';
import { Quote } from '../../../api/quotes/models/quote.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface QuotesPagination {
  booksQuotes: QuotesPaginationState,
  authorQuotes: QuotesPaginationState,
  readerQuotes: QuotesPaginationState,
}

export interface QuotesPaginationState {
  entities: Quote[]
  pageResult: PageResult
  processing: boolean,
  error: ApiError
}

const initialBookQuotesPageState: QuotesPaginationState = {
  entities: [],
  pageResult: undefined,
  processing: false,
  error: undefined
};

const initialAuthorQuotesPageState: QuotesPaginationState = {
  entities: [],
  pageResult: undefined,
  processing: false,
  error: undefined
}

const initialReaderQuotesPageState: QuotesPaginationState = {
  entities: [],
  pageResult: undefined,
  processing: false,
  error: undefined
}

export const paginationInitialState: QuotesPagination = {
  booksQuotes: initialBookQuotesPageState,
  authorQuotes: initialAuthorQuotesPageState,
  readerQuotes: initialReaderQuotesPageState
};

const bookReducer = createReducer(initialBookQuotesPageState,
  on(fromActions.SELECT_BOOK_QUOTES_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SET_BOOK_QUOTES_PAGE, (state, action) => ({
    ...state, entities: action.payload.quotes,
    pageResult: action.payload.pageResult
  })),
  on(fromActions.SET_BOOK_QUOTES_PAGE_SUCCESS, (state) => ({ ...state, processing: false }))
);

const authorReducer = createReducer(initialAuthorQuotesPageState,
  on(fromActions.SELECT_AUTHOR_QUOTES_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SET_AUTHOR_QUOTES_PAGE, (state, action) => ({ ...state, entities: action.payload.quotes, pageResult: action.payload.pageResult })),
  on(fromActions.SET_AUTHOR_QUOTES_PAGE_SUCCESS, (state) => ({ ...state, processing: false }))
);

const readerReducer = createReducer(initialReaderQuotesPageState,
  on(fromActions.SET_READER_QUOTES_PAGE, (state) => ({ ...state, processing: true })),
  on(fromActions.SET_READER_QUOTES_PAGE, (state, action) => ({ ...state, processing: false, entities: action.payload.quotes, pageResult: action.payload.pageResult }))
);

const reducersMap: ActionReducerMap<QuotesPagination> = {
  booksQuotes: bookReducer,
  authorQuotes: authorReducer,
  readerQuotes: readerReducer
}

const reducer = combineReducers(reducersMap);

export function quotesPaginationReducer(state: QuotesPagination, action: Action) {
  return reducer(state, action);
}
