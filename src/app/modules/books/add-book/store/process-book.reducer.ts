import * as fromAction from './process-book.actions';
import { on, createReducer, Action } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface ProcessBookState {
  processing: boolean
  error: ApiError
}

const initialState: ProcessBookState = {
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.ADD_BOOK, (state) => ({ ...state, processing: true })),
  on(fromAction.ADD_BOOK_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromAction.ADD_BOOK_SUCCESS, (state, action) => ({ ...state, addedBook: action.payload.book, processing: false }))
);

export function addBookReducer(state: ProcessBookState, action: Action) {
  return reducer(state, action);
}
