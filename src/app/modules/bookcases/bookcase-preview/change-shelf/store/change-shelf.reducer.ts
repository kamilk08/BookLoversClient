import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { Shelf } from '../../../models';
import * as fromActions from './change-shelf.actions';

export interface ChangeShelfState {
  oldShelf: Shelf,
  shelf: Shelf,
  book: Book,
  processing: boolean,
  error: ApiError
};

const initialState: ChangeShelfState = {
  oldShelf: undefined,
  shelf: undefined,
  book: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.CHANGE_SHELF, (state, action) => {
    return { ...state, oldShelf: { ...action.payload.shelves.oldShelf } as Shelf, shelf: { ...action.payload.shelves.newShelf } as Shelf, book: { ...action.payload.book } as Book, processing: true }
  }),
  on(fromActions.CHANGE_SHELF_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.CHANGE_SHELF_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function changeShelfReducer(state: ChangeShelfState, action: Action) {
  return reducer(state, action);
}
