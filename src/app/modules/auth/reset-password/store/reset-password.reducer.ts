import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";

import * as fromActions from '../store/reset-password.actions';

export interface ResetPasswordState {
  token: string,
  password: string,
  processing: boolean,
  error: ApiError
}

const initialState: ResetPasswordState = {
  token: undefined,
  password: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.RESET_PASSWORD, (state, action) => {
    return { ...state, processing: true, token: action.payload.token, password: action.payload.password }
  }),
  on(fromActions.RESET_PASSWORD_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.RESET_PASSWORD_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function resetPasswordReducer(state: ResetPasswordState, action: Action) {
  return reducer(state, action);
}
