
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/modules/api/auth/models/user.model';
import * as authAction from './auth.actions';

export interface AuthenticationState {
  user: User
  assigning: boolean
  assigned: boolean,
  error: any
}

const initialState: AuthenticationState = {
  user: undefined,
  assigning: false,
  assigned: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(authAction.ASSIGN_USER, state => ({ ...state, assigning: true, assigned: false })),
  on(authAction.ASSIGN_USER_SUCCESS, (state, action) => ({ ...state, user: action.payload.user, assigned: true, assigning: false })),
  on(authAction.ASSIGN_USER_FALIURE, (state, action) => ({ ...state, assigned: false, assigning: false, error: action.payload.error })),
  on(authAction.LOGOUT, (state) => ({ ...state })),
  on(authAction.LOGOUT_SUCCESS, (state => ({ ...state, user: undefined }))),
  on(authAction.LOGOUT_FALIURE, (state) => ({ ...state }))
);

export function authenticationReducer(state: AuthenticationState, action: Action) {
  return reducer(state, action);
}
