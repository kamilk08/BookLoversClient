import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Shelf } from '../../../models';
import * as fromActions from './remove-shelf.actions';

export interface RemoveShelfState {
  shelf: Shelf,
  processing: boolean,
  error: ApiError
}

const initialState: RemoveShelfState = {
  shelf: undefined,
  processing: false,
  error: undefined
};


const reducer = createReducer(initialState,
  on(fromActions.REMOVE_SHELF, (state, action) => ({ ...state, shelf: action.payload.shelf, processing: true })),
  on(fromActions.REMOVE_SHELF_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_SHELF_FALIURE, (state, action) => ({ ...state, error: action.payload.model }))
);

export function removeShelfReducer(state: RemoveShelfState, action: Action) {
  return reducer(state, action);
}
