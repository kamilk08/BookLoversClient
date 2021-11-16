import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Shelf } from '../../../models';
import * as fromActions from './add-book-to-shelf.actions';

export interface AddBookToShelfState {
  shelf: Shelf
  book: Book
  processing: boolean
  error: ApiError
}

const initialState: AddBookToShelfState = {
  shelf: undefined,
  book: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.ADD_BOOK_TO_SHELF, (state, action) => {
    return { ...state, shelf: { ...action.payload.shelf } as Shelf, book: { ...action.payload.book } as Book, processing: true }
  }),
  on(fromActions.ADD_BOOK_TO_SHELF_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.ADD_BOOK_TO_SHELF_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function addBookToBookcaseReducer(state: AddBookToShelfState, action: Action) {
  return reducer(state, action);
}
