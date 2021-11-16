import { createSelector } from "@ngrx/store";
import { signUpModuleState, SignUpModuleState } from '.';
import { SignUpPageState } from "./sign-up.reducer";


const signUpState = createSelector(signUpModuleState, (state: SignUpModuleState) => {
  if (state) return state.signUpPage;

  return undefined;
})

export const isRedirected = createSelector(signUpState, (state: SignUpPageState) => {
  if (state) return state.redirected;

  return undefined;
});
export const signUpError = createSelector(signUpState, (state: SignUpPageState) => {
  if (state) return state.error;

  return undefined;
});
export const tryingToSignUp = createSelector(signUpState, (state: SignUpPageState) => {
  if (state) return state.tryingToSignUp;

  return undefined;
});
