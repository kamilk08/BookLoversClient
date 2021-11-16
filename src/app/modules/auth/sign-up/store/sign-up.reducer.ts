import * as signUpAction from './sign-up.actions';
import { createReducer, on, Action } from '@ngrx/store'; import { ApiError } from 'src/app/modules/api/api-error.model';
;

export interface SignUpPageState {
  redirected: boolean
  error: ApiError
  tryingToSignUp: boolean
}

const initialState: SignUpPageState = {
  redirected: false,
  error: null,
  tryingToSignUp: false
};

const reducer = createReducer(initialState,
  on(signUpAction.SIGN_UP, state => ({ ...state, tryingToSignUp: true })),
  on(signUpAction.SIGN_UP_SUCCESS, state => ({ ...state, tryingToSignUp: false, redirected: true })),
  on(signUpAction.SIGN_UP_FALIURE, (state, action) => ({ ...state, tryingToSignUp: false, error: action.payload.error }))
);

export function signUpReducer(state: SignUpPageState, action: Action) {
  return reducer(state, action);
}
