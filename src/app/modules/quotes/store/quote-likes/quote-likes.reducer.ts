import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Quote } from '../../../api/quotes/models/quote.model';
import * as fromActions from './quote-likes.actions';

export interface QuoteLikesState {
  quote: Quote
  userId: number
  processing: boolean
  error: ApiError
};

const initialState: QuoteLikesState = {
  quote: undefined,
  userId: undefined,
  processing: false,
  error: undefined
};


const reducer = createReducer(initialState,
  on(fromActions.LIKE_QUOTE, (state, action) => {
    return { ...state, quote: action.payload.quote, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.LIKE_QUOTE_SUCCESS, (state) => {
    const quote = state.quote;
    quote.addLike(state.userId);
    return { ...state, quote: quote, processing: false }
  }),
  on(fromActions.LIKE_QUOTE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  }),
  on(fromActions.UNLIKE_QUOTE, (state, action) => {
    return { ...state, quote: action.payload.quote, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.UNLIKE_QUOTE_SUCCESS, (state) => {
    const quote = state.quote;
    quote.removeLike(state.userId);

    return { ...state, quote: quote, processing: false }
  }),
  on(fromActions.UNLIKE_QUOTE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function quoteLikesReducer(state: QuoteLikesState, action: Action) {
  return reducer(state, action);
}
