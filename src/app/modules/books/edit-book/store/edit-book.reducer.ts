import * as fromAction from './edit-book.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface ProcessEditedBook {
  processing: boolean
  error: ApiError
}

const initialState: ProcessEditedBook = {
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.EDIT_BOOK, (state) => ({ ...state, processing: true })),
  on(fromAction.EDIT_BOOK_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromAction.EDIT_BOOK_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function editBookReducer(state: ProcessEditedBook, action: Action) {
  return reducer(state, action);
}


