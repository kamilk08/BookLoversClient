import { createSelector } from "@ngrx/store";
import { authModuleState, AuthModuleState } from '..';
import { AuthenticationState } from "./auth.reducer";

const authenticationState = createSelector(authModuleState, (state: AuthModuleState) => {
  if (state)
    return state.authentication

  return undefined;
});

export const authenticatedUser = createSelector(authenticationState, (state: AuthenticationState) => {
  if (state)
    return state.user;

  return undefined;
});
export const isAssigning = createSelector(authenticationState, (state: AuthenticationState) => {
  if (state)
    return state.assigning;

  return undefined;
});
export const isUserAssigned = createSelector(authenticationState, (state: AuthenticationState) => {
  if (state)
    return state.assigned

  return undefined;
});


