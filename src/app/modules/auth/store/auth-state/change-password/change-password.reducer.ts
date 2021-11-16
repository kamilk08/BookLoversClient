import { createReducer, on, Action } from '@ngrx/store'
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as changePasswordAction from './change-password.actions';

export interface ChangePasswordState {
  success: boolean
  processing: boolean,
  error: ApiError
}

const initialState: ChangePasswordState = {
  success: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(changePasswordAction.CHANGE_PASSWORD, state => ({ ...state, processing: true })),
  on(changePasswordAction.CHANGE_PASSWORD_SUCCESS, (state => ({ ...state, processing: false, success: true }))),
  on(changePasswordAction.CHANGE_PASSWORD_FALIURE, (state => ({ ...state, processing: false, success: false })))
);

export function changePasswordReducer(state: ChangePasswordState, action: Action) {
  return reducer(state, action);
}
