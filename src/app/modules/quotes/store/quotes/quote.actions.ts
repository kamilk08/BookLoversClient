import { createAction, props } from '@ngrx/store';
import { Quote } from '../../../api/quotes/models/quote.model';


export const SELECT_QUOTE = createAction('[QUOTES] Select quote by id', props<{ payload: { id: number } }>());
export const FETCH_QUOTE = createAction('[QUOTES] Fetch quote', props<{ payload: { quote: Quote } }>());
export const UPDATE_QUOTE = createAction('[QUOTES] Update quote', props<{ payload: { quote: Quote } }>());
export const FETCH_MULTIPLE_QUOTES = createAction('[QUOTES] Fetch multiple quotes', props<{ payload: { quotes: Quote[] } }>());
export const FETCH_QUOTE_FALIURE = createAction('[QUOTES] Fetch quote faliure', props<{ payload: { error: any } }>());



