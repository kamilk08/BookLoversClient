import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Shelf } from '../../../models';

import * as fromActions from './edit-shelf.actions';

export interface EditShelfState {
  shelf: Shelf,
  shelfName: string,
  processing: boolean,
  error: ApiError
}

const initialState: EditShelfState = {
  shelf: undefined,
  shelfName: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.EDIT_CUSTOM_SHELF_NAME, (state, action) => {
    return { ...state, shelf: { ...action.payload.shelf } as Shelf, shelfName: action.payload.shelfName, processing: true }
  }),
  on(fromActions.EDIT_CUSOTM_SHELF_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.EDIT_CUSTOM_SHELF_NAME_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function editShelfReducer(state: EditShelfState, action: Action) {
  return reducer(state, action);
};


