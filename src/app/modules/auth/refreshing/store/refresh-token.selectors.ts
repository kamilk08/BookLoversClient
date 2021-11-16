import { createSelector } from "@ngrx/store";
import { baseRefreshTokenStateSelector, RefreshTokenState } from '..';
import { CurrentRefreshTokenState } from './refresh-token.reducer';

const currentRefreshTokenState = createSelector(baseRefreshTokenStateSelector, (state: RefreshTokenState) => {
  if (state) return state.currentRefreshToken;

  return undefined;
});

export const isSuccess = createSelector(currentRefreshTokenState, (state: CurrentRefreshTokenState) => {
  if (state) return state.isSuccess;

  return undefined;
})

export const isRefreshing = createSelector(currentRefreshTokenState, (state: CurrentRefreshTokenState) => {
  if (state) return state.isRefreshing;

  return undefined;
});
export const refreshToken = createSelector(currentRefreshTokenState, (state: CurrentRefreshTokenState) => {
  if (state) return state.refreshToken;

  return undefined;
});
export const error = createSelector(currentRefreshTokenState, (state: CurrentRefreshTokenState) => {
  if (state) return state.error;

  return undefined;
});
