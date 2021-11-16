import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromRefreshToken from './store/refresh-token.reducer';

export interface RefreshTokenState {
  currentRefreshToken: fromRefreshToken.CurrentRefreshTokenState
}

const reducersMap: ActionReducerMap<RefreshTokenState> = {
  currentRefreshToken: fromRefreshToken.refreshTokenReducer
};

const reducer = combineReducers(reducersMap);

export function refreshTokenModuleReducer(state: RefreshTokenState, action: Action) {
  return reducer(state, action);
}


export const baseRefreshTokenStateSelector = createFeatureSelector('refresh-token');
