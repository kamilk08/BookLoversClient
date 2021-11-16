import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Quote } from '../../../api/quotes/models/quote.model';

export const ADD_AUTHOR_QUOTE = createAction('[QUOTES] Add author quote', props<{ payload: { quote: Quote } }>());
export const ADD_BOOK_QUOTE = createAction('[QUOTES] Add book quote', props<{ payload: { quote: Quote } }>());
export const ADD_QUOTE_SUCCESS = createAction('[QUOTES] Add quote success', props<{ payload: { quoteId: number } }>());
export const ADD_QUOTE_FALIURE = createAction('[QUOTES] Add quote faliure', props<{ payload: { model: ApiError } }>());
