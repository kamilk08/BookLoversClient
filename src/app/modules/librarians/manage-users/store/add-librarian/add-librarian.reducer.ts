import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddLibrarianModel } from 'src/app/modules/api/librarians/models/add-librarian.model';
import * as fromActions from './add-librarian.actions';

export interface AddLibrarianState {
  model: AddLibrarianModel
  processing: boolean
  error: ApiError
};

const initialState: AddLibrarianState = {
  model: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_LIBRARIAN, (state, action) => {
    return { ...state, model: action.payload.model, processing: true }
  }),
  on(fromActions.ADD_LIBRARIAN_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.ADD_LIBRARIAN_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function addLibrarianReducer(state: AddLibrarianState, action: Action) {
  return reducer(state, action);
}


