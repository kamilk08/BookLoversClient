import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';

export const REMOVE_BOOK_FROM_SHELF = createAction('[REMOVE_BOOK] Remove book from shelf', props<{ payload: { bookcase: Bookcase, shelf: Shelf, book: Book } }>());
export const REMOVE_BOOK_FROM_SHELF_SUCCESS = createAction('[REMOVE_BOOK] Remove book from', props<{ payload: { bookcase: Bookcase } }>())
export const REMOVE_BOOK_FROM_SHELF_FALIURE = createAction('[REMOVE_BOOK] Remove book from shelf faliure', props<{ payload: { model: ApiError } }>());
