import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromQuotes from './quotes/quote.reducer';
import * as fromPaginatedQuotes from './quotes-pagination/quotes-pagination.reducer';
import * as fromAddQuotes from './add-quotes/add-quote.reducer';
import * as fromQuoteLikes from './quote-likes/quote-likes.reducer';
import * as fromWebPage from './quotes-web-page/quotes-web-page.reducer';

export interface QuotesState {
  quoteLikes: fromQuoteLikes.QuoteLikesState,
  addQuote: fromAddQuotes.AddQuoteState,
  quotes: fromQuotes.Quotes,
  quotePagination: fromPaginatedQuotes.QuotesPagination,
  webPage: fromWebPage.QuotesWebPageState
}

const reducerMap: ActionReducerMap<QuotesState> = {
  quoteLikes: fromQuoteLikes.quoteLikesReducer,
  addQuote: fromAddQuotes.addQuoteReducer,
  quotes: fromQuotes.quoteReducer,
  quotePagination: fromPaginatedQuotes.quotesPaginationReducer,
  webPage: fromWebPage.quotesWebPageReducer
};

const reducer = combineReducers(reducerMap);

export function quotesStateReducer(state: QuotesState, action: Action) {
  return reducer(state, action);
}

export const quotesState = createFeatureSelector('quotes');
