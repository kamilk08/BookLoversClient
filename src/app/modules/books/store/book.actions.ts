import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from '../../api/api-error.model';
import { Book } from '../../api/books/models/book.model';
import { BookNotFound } from '../models/book-not-found';

export const SELECT_BOOK = createAction('[BOOKS] Select book', props<{ payload: { bookId: number } }>());
export const SELECT_BOOK_BY_GUID = createAction('[BOOKS] Select book by guid', props<{ payload: { guid: UUID } }>());
export const SELECT_MUTLTIPLE_BOOKS_BY_ID = createAction('[BOOKS] Select multiple books by id', props<{ payload: { bookIds: number[] } }>());
export const SELECT_MULTIPLE_BOOKS_BY_GUID = createAction('[BOOKS] Select multiple books by guid', props<{ payload: { guids: UUID[] } }>());
export const FETCH_BOOK = createAction('[BOOKS] Fetch book', props<{ payload: { book: Book } }>());
export const FETCH_MULTIPLE_BOOKS = createAction('[BOOKS] Fetch multiple books', props<{ payload: { books: Book[] } }>());
export const FETCH_BOOK_FALIURE = createAction('[BOOKS] Fetch book faliure', props<{ payload: { model: ApiError } }>())

export const BOOK_NOT_FOUND = createAction('[BOOKS] Book not found', props<{ payload: { model: BookNotFound } }>());
