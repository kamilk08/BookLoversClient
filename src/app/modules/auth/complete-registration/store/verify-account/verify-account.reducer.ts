import { createReducer, on, Action } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as verifyAccountAction from './verify-account.actions';

export interface VerifyAccountState {
  redirected: boolean
  error: ApiError
  tryingToVerify: boolean;
}

const initialState: VerifyAccountState = {
  redirected: false,
  error: undefined,
  tryingToVerify: false
};

const reducer = createReducer(initialState,
  on(verifyAccountAction.VERIFY_ACCOUNT, state => ({ ...state, tryingToVerify: true })),
  on(verifyAccountAction.VERIFY_ACCOUNT_SUCCESS, state => ({ ...state, redirected: true, tryingToVerify: false })),
  on(verifyAccountAction.VERIFY_ACCOUNT_FALIURE, (state, action) => ({ ...state, redirected: false, tryingToVerify: false, error: action.payload.error }))
);

export function verifyAccountReducer(state: VerifyAccountState, action: Action) {
  return reducer(state, action);
}
