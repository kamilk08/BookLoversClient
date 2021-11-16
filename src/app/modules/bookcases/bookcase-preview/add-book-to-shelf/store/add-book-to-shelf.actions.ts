import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';

export const ADD_BOOK_TO_SHELF = createAction('[ADD_BOOK_TO_SHELF] Add book to shelf', props<{ payload: { bookcase: Bookcase, shelf: Shelf, book: Book } }>());
export const ADD_BOOK_TO_SHELF_SUCCESS = createAction('[ADD_BOOK_TO_SHELF] Add book to shelf success', props<{ payload: { bookcase: Bookcase } }>());
export const ADD_BOOK_TO_SHELF_FALIURE = createAction('[ADD_BOOK_TO_SHELF] Add boo to bookcase faliure', props<{ payload: { model: ApiError } }>());
