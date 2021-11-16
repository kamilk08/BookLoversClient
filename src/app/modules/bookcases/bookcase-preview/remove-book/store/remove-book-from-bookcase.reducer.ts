import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import * as fromActions from './remove-book-from-bookcase.actions';

export interface RemoveBookFromBookcaseState {
  book: Book
  processing: boolean
  error: ApiError
}

const initialState: RemoveBookFromBookcaseState = {
  book: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_BOOK_FROM_BOOKCASE, (state, action) => {
    return { ...state, book: action.payload.book, processing: true }
  }),
  on(fromActions.REMOVE_BOOK_FROM_BOOKCASE_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_BOOK_FROM_BOOKCASE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function removeBookFromBookcaseReducer(state: RemoveBookFromBookcaseState, action: Action) {
  return reducer(state, action);
}
