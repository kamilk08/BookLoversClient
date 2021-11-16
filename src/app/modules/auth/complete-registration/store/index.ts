import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromVerifyAccountState from './verify-account/verify-account.reducer';
import * as fromVerifyAccountWebPage from './page/verify-account-web-page.reducer';

export interface VerifyAccountModuleState {
  verifyAccount: fromVerifyAccountState.VerifyAccountState,
  webPage: fromVerifyAccountWebPage.VerifyAccountWebPageState
};

const reducers: ActionReducerMap<VerifyAccountModuleState> = {
  verifyAccount: fromVerifyAccountState.verifyAccountReducer,
  webPage: fromVerifyAccountWebPage.verifyAccountWebPageReducer
};

export const reducer = combineReducers(reducers);

export function verifyAccountModuleReducer(state: VerifyAccountModuleState, action: Action) {
  return reducer(state, action);
}

export const verifyAccountModuleState = createFeatureSelector('verify-account');
