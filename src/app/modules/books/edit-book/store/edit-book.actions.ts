import { createAction, props } from '@ngrx/store';
import { Book } from '../../../api/books/models';
import { EditBookPicture } from '../../../api/books/edit/models/edit-book-picture.interface';
import { ApiError } from 'src/app/modules/api/api-error.model';


export const EDIT_BOOK = createAction('[EDIT_BOOK] Edit book', props<{ payload: { book: Book, cover?: EditBookPicture } }>());
export const EDIT_BOOK_FALIURE = createAction('[EDIT_BOOK] Edit book faliure', props<{ payload: { model: ApiError } }>());
export const EDIT_BOOK_SUCCESS = createAction('[EDIT_BOOK] Edit book success', props<{ payload: { book: Book } }>());
