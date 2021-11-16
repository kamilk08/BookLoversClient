import * as fromAuthentication from './auth-state/auth.reducer'
import * as fromChangeEmail from './auth-state/change-email/change-email.reducer'
import * as fromChangePassword from './auth-state/change-password/change-password.reducer';
import * as fromBlockAccount from './auth-state/block-account/block-account.reducer';

import { ActionReducerMap, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { AuthenticationEffects } from './auth-state/auth.effects';
import { BlockAccountEffects } from './auth-state/block-account/block-account.effects';
import { ChangeEmailEffects } from './auth-state/change-email/change-email.effects';
import { ChangePasswordEffects } from './auth-state/change-password/change-password.effects';

export interface AuthModuleState {
  authentication: fromAuthentication.AuthenticationState,
  changeEmail: fromChangeEmail.ChangeEmailState
  changePassword: fromChangePassword.ChangePasswordState,
  blockAccount: fromBlockAccount.BlockAccountState,
}

const reducersMap: ActionReducerMap<AuthModuleState> = {
  authentication: fromAuthentication.authenticationReducer,
  changeEmail: fromChangeEmail.changeEmailReducer,
  changePassword: fromChangePassword.changePasswordReducer,
  blockAccount: fromBlockAccount.blockAccountReducer
};

const moduleReducer = combineReducers(reducersMap);

export function authModuleReducer(state: AuthModuleState, action: Action) {
  return moduleReducer(state, action);
}

export const moduleEffects: any[] = [
  AuthenticationEffects, ChangeEmailEffects,
  ChangePasswordEffects, BlockAccountEffects
]

//MODULE_STATE
export const authModuleState = createFeatureSelector<AuthModuleState>('auth');
