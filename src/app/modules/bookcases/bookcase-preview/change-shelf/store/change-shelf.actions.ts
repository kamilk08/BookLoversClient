import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';

export const CHANGE_SHELF = createAction('[BOOKCASE_PREVIEW] Change books shelf', props<{ payload: { bookcase: Bookcase, shelves: { oldShelf: Shelf, newShelf: Shelf }, book: Book } }>());
export const CHANGE_SHELF_SUCCESS = createAction('[CHANGE_SHELF] Change shelf', props<{ payload: { bookcase: Bookcase } }>());
export const CHANGE_SHELF_FALIURE = createAction('[BOOKCASE_PREVIEW] Change books shelf faliure', props<{ payload: { model: ApiError } }>());
