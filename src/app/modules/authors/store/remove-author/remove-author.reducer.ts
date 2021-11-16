import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from './remove-author.actions'

export interface RemoveAuthor {
  processing: boolean,
  succeded: boolean,
  error: ApiError
}

const initialState: RemoveAuthor = {
  processing: false,
  succeded: undefined,
  error: undefined
};


const reducer = createReducer(initialState,
  on(fromActions.REMOVE_AUTHOR, (state) => ({ ...state, processing: true })),
  on(fromActions.REMOVE_AUTHOR_FALIURE, (state, action) => ({ ...state, processing: false, succeded: false, error: action.payload.model })),
  on(fromActions.REMOVE_AUTHOR_SUCCESS, (state) => ({ ...state, processing: false, succeded: true }))
);

export function removeAuthorReducer(state: RemoveAuthor, action: Action) {
  return reducer(state, action);
}
