import * as fromSignUp from './sign-up.reducer';
import * as fromSignUpWebPage from './sign-up-webpage/sign-up-webpage.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface SignUpModuleState {
  signUpPage: fromSignUp.SignUpPageState,
  signUpWebPage: fromSignUpWebPage.SignUpWebPageState
}

const reducersMap: ActionReducerMap<SignUpModuleState> = {
  signUpPage: fromSignUp.signUpReducer,
  signUpWebPage: fromSignUpWebPage.signUpWebPageReducer
};

const reducer = combineReducers(reducersMap);

export function signUpStateReducer(state: SignUpModuleState, action: Action) {
  return reducer(state, action);
}

export const signUpModuleState = createFeatureSelector('sign-up');
