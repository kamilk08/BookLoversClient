import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Shelf } from '../../../models';
import * as fromActions from './remove-book-from-shelf.actions';

export interface RemoveBookFromShelfState {
  shelf: Shelf,
  book: Book,
  processing: boolean,
  error: ApiError
}

const initialState: RemoveBookFromShelfState = {
  shelf: undefined,
  book: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_BOOK_FROM_SHELF, (state, action) => {
    return { ...state, shelf: { ...action.payload.shelf } as Shelf, book: { ...action.payload.book } as Book, processing: true }
  }),
  on(fromActions.REMOVE_BOOK_FROM_SHELF_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_BOOK_FROM_SHELF_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function removeBookFromShelfReducer(state: RemoveBookFromShelfState, action: Action) {
  return reducer(state, action);
}
