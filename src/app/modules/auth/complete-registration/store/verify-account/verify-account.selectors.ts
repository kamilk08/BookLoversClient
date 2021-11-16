import { createSelector } from '@ngrx/store';
import { verifyAccountModuleState, VerifyAccountModuleState } from '..';
import { VerifyAccountState } from './verify-account.reducer';

const verifyAccountState = createSelector(verifyAccountModuleState, (state: VerifyAccountModuleState) => {
  if (state) return state.verifyAccount;

  return undefined;
});

export const isRedirected = createSelector(verifyAccountState, (state: VerifyAccountState) => {
  if (state) return state.redirected;

  return undefined;
});
export const tryingToVerify = createSelector(verifyAccountState, (state: VerifyAccountState) => {
  if (state) return state.tryingToVerify;

  return undefined;
});
export const error = createSelector(verifyAccountState, (state: VerifyAccountState) => {
  if (state) return state.error;

  return undefined;
});
