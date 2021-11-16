import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromSignInPage from './sign-in/sign-in.reducer';

export interface SignInModuleState {
  signInPage: fromSignInPage.SignInPageState
}

const reducersMap: ActionReducerMap<SignInModuleState> = {
  signInPage: fromSignInPage.signInReducer
}

const reducer = combineReducers(reducersMap);


export function signInPageReducer(state: SignInModuleState, action: Action) {
  return reducer(state, action);
}

export const signInState = createFeatureSelector('sign-in');
