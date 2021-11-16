import * as fromAuth from '../modules/auth/store/index';
import { createSelector, ActionReducerMap, combineReducers, Action } from '@ngrx/store';

export interface AppState {
  authState: fromAuth.AuthModuleState;
}

export const appReducersMap: ActionReducerMap<AppState> = {
  authState: fromAuth.authModuleReducer
}

const reducer = combineReducers(appReducersMap);

export const authState = createSelector(fromAuth.authModuleState, (state: fromAuth.AuthModuleState) => state);

export function appReducer(state: AppState, action: Action) {
  return reducer(state, action);
}
