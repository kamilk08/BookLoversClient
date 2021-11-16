import { createSelector } from "@ngrx/store";
import { SignUpModel } from "src/app/modules/api/auth/sign-up/models/sign-up.model";
import { SignUpModuleState, signUpModuleState } from "..";
import { SignUpWebPageState } from "./sign-up-webpage.reducer";

const signUpWebPageState = createSelector(signUpModuleState, (state: SignUpModuleState) => state.signUpWebPage);

export const signUpForm = createSelector(signUpWebPageState, (state: SignUpWebPageState) => state.form);

export const signUpModel = createSelector(signUpWebPageState, (state: SignUpWebPageState) => {

  const username = state.form.get('username').value;
  const email = state.form.get('email').value
  const password = state.form.get('password').value;

  return new SignUpModel(username, email, password)
});
