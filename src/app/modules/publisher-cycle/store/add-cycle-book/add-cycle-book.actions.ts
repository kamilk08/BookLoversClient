import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';

export const ADD_CYCLE_BOOK = createAction('[PUBLISHER_CYCLE] Add cycle book', props<{ payload: { cycle: any, book: Book } }>());
export const ADD_CYCLE_BOOK_SUCCESS = createAction('[PUBLISHER_CYCLE] Add publisher cycle success', props<{ payload: {} }>());
export const ADD_CYCLE_BOOK_FALIURE = createAction('[PUBLISHER_CYCLE] Add cycle book faliure', props<{ payload: { model: ApiError } }>());
