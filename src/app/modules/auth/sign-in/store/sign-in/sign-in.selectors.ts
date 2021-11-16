import { createSelector } from "@ngrx/store";
import { SignInModuleState, signInState } from "..";
import { Credentials } from "../../../../api/auth/sign-in/models/credentials.model";
import { SignInPageState } from "./sign-in.reducer";

const signInPage = createSelector(signInState, (state: SignInModuleState) => {
  if (state) return state.signInPage;

  return undefined;
});

export const token = createSelector(signInPage, (state: SignInPageState) => {
  if (state) return state.token;

  return undefined;
});
export const signInError = createSelector(signInPage, (state: SignInPageState) => {
  if (state) return state.error;

  return undefined;
});
export const processingSignIn = createSelector(signInPage, (state: SignInPageState) => {
  if (state) return state.processing;

  return undefined;
});

export const singInForm = createSelector(signInPage, (state: SignInPageState) => {
  if (state) return state.form;

  return undefined;
});
export const credentials = createSelector(signInPage, (state: SignInPageState) => {
  if (state) {
    return new Credentials(state.form.get('email').value, state.form.get('password').value);
  }

  return undefined;
});

export const password = createSelector(signInPage, (state: SignInPageState) => {
  return state.form.get('password');
})
