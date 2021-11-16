import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Shelf } from '../../../models';
import * as fromActions from './add-custom-shelf.actions';

export interface AddShelfState {
  shelf: Shelf
  processing: boolean
  error: ApiError
}

const initialState: AddShelfState = {
  shelf: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_CUSTOM_SHELF, (state, action) => {
    return { ...state, shelf: action.payload.shelf, processing: true }
  }),
  on(fromActions.ADD_CUSTOM_SHELF_SUCCESS, (state, action) => {
    let shelf = state.shelf;
    shelf.identification.id = action.payload.shelfResponse.shelfId;
    return { ...state, shelf: shelf, processing: false }
  }),
  on(fromActions.ADD_CUSTOM_SHELF_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model, shelf: undefined }))
);

export function addShelfReducer(state: AddShelfState, action: Action) {
  return reducer(state, action);
}
