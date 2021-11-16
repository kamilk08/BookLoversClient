import { fetchMany, fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './quote.actions';
import { Quote } from '../../../api/quotes/models/quote.model';

export interface Quotes {
  entities: { [id: number]: Quote },
  ids: number[],
  error: any,
  processing: boolean
}

const initialState: Quotes = {
  entities: {},
  ids: [],
  error: undefined,
  processing: false
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_QUOTE, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_MULTIPLE_QUOTES, state => ({ ...state, processing: true })),
  on(fromActions.UPDATE_QUOTE, (state, action) => {
    return { ...state, entities: { ...state.entities, [action.payload.quote.identification.id]: action.payload.quote } }
  }),
  on(fromActions.FETCH_QUOTE, (state, action) => {
    const newState = fetchSingle((quote: Quote) => quote.identification.id, state, action.payload.quote);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.FETCH_MULTIPLE_QUOTES, (state, action) => {
    const newState = fetchMany((quote: Quote) => quote.identification.id, state, action.payload.quotes);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.FETCH_QUOTE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error })),
)

export function quoteReducer(state: Quotes, action: Action) {
  return reducer(state, action);
}
