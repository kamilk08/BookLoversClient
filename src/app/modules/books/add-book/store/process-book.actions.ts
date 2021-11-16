import { createAction, props } from '@ngrx/store';
import { Book } from '../../../api/books/models/book.model';
import { AddBookPicture } from '../../../api/books/add/models/add-book-picture.interface';
import { ApiError } from 'src/app/modules/api/api-error.model';


export const ADD_BOOK = createAction('[ADD_BOOK] Add book', props<{ payload: { book: Book, cover?: AddBookPicture } }>());
export const ADD_BOOK_FALIURE = createAction('[ADD_BOOK] Add book faliure', props<{ payload: { model: ApiError } }>());
export const ADD_BOOK_SUCCESS = createAction('[ADD_BOOK] Add book success', props<{ payload: { book: Book } }>());
