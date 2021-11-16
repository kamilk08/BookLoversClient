import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store'
import * as fromReducer from '../store/reset-password.reducer'

export interface ResetPasswordModuleState {
  resetPassword: fromReducer.ResetPasswordState
};

const reducerMap: ActionReducerMap<ResetPasswordModuleState> = {
  resetPassword: fromReducer.resetPasswordReducer
}

const moduleReducer = combineReducers(reducerMap);

export function resetPasswordModuleReducer(state: ResetPasswordModuleState, action: Action) {
  return moduleReducer(state, action);
}

export const resetPasswordState = createFeatureSelector('reset-password');
