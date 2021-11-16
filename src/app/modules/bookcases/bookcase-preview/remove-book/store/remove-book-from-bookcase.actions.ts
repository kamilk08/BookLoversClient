import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';

export const REMOVE_BOOK_FROM_BOOKCASE = createAction('[REMOVE_BOOKCASE_BOOK] Remove book from bookcase', props<{ payload: { bookcase: Bookcase, book: Book, shelfs?: Shelf[] } }>());
export const REMOVE_BOOK_FROM_BOOKCASE_SUCCESS = createAction('[REMOVE_BOOKCASE_BOOK] Remove bookcase book success', props<{ payload: { bookcase: Bookcase } }>());
export const REMOVE_BOOK_FROM_BOOKCASE_FALIURE = createAction('[BOOKCASE_PREVIEW] Remove book from bookcase faliure', props<{ payload: { model: ApiError } }>());
