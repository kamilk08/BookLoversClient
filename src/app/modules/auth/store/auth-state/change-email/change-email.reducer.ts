import * as changeEmailAction from './change-email.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface ChangeEmailState {
  processing: boolean
  error: ApiError
}

const initialState: ChangeEmailState = {
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(changeEmailAction.CHANGE_EMAIL, (state) => ({ ...state, processing: true })),
  on(changeEmailAction.CHANGE_EMAIL_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(changeEmailAction.CHANGE_EMAIL_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function changeEmailReducer(state: ChangeEmailState, action: Action) {
  return reducer(state, action);
}
