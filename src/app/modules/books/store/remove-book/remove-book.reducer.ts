import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { Book } from "src/app/modules/api/books/models";

import * as fromActions from './remove-book.actions';

export interface RemoveBookState {
  book: Book
  processing: boolean,
  success: boolean,
  error: ApiError
}

const initialState: RemoveBookState = {
  book: undefined,
  processing: undefined,
  success: undefined,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_BOOK, (state, action) => {
    return { ...state, book: action.payload.book, processing: true }
  }),
  on(fromActions.REMOVE_BOOK_SUCCESS, (state) => {
    return { ...state, processing: false, success: true }
  }),
  on(fromActions.REMOVE_BOOK_FALIURE, (state, action) => {
    return { ...state, success: false, processing: false, error: action.payload.model }
  })
);

export function removeBookReducer(state: RemoveBookState, action: Action) {
  return reducer(state, action);
}
