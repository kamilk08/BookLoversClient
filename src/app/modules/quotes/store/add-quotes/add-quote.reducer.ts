import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Quote } from '../../../api/quotes/models/quote.model';
import * as fromActions from './add-quote.actions';

export interface AddQuoteState {
  quote: Quote
  processing: boolean
  error: ApiError
}

const initialState: AddQuoteState = {
  quote: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_AUTHOR_QUOTE, (state, action) => {
    return { ...state, quote: action.payload.quote, processing: true }
  }),
  on(fromActions.ADD_BOOK_QUOTE, (state, action) => {
    return { ...state, quote: action.payload.quote, processing: true }
  }),
  on(fromActions.ADD_QUOTE_SUCCESS, (state, action) => {
    const quote = state.quote;
    quote.setQuoteId(action.payload.quoteId);

    return { ...state, quote: quote, processing: false }
  }),
  on(fromActions.ADD_QUOTE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);


export function addQuoteReducer(state: AddQuoteState, action: Action) {
  return reducer(state, action);
}
