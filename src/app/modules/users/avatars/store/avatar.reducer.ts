import { createReducer, on, Action } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromAction from './avatar.actions';

export interface Avatars {
  processing: boolean
  error: ApiError
}

const initialState: Avatars = {
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.CHANGE_AVATAR, (state) => ({ ...state, processing: true })),
  on(fromAction.CHANGE_AVATAR_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromAction.CHANGE_AVATAR_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function avatarsReducer(state: Avatars, action: Action) {
  return reducer(state, action);
}
