import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Quote } from '../../../api/quotes/models/quote.model';

export const LIKE_QUOTE = createAction('[QUOTES] Like quote', props<{ payload: { quote: Quote, userId: number } }>());
export const LIKE_QUOTE_FALIURE = createAction('[QUOTES] Like quote faliure', props<{ payload: { model: ApiError } }>());
export const LIKE_QUOTE_SUCCESS = createAction('[QUOTES] Like quote success')

export const UNLIKE_QUOTE = createAction('[QUOTES] Unlike quote', props<{ payload: { quote: Quote, userId: number } }>());
export const UNLIKE_QUOTE_FALIURE = createAction('[QUOTES] Unlike quote faliure', props<{ payload: { model: ApiError } }>());
export const UNLIKE_QUOTE_SUCCESS = createAction('[QUOTES] Unlike quote success');
