import { createSelector } from "@ngrx/store";
import { VerifyAccountModuleState, verifyAccountModuleState } from "..";
import { VerifyAccountWebPageState } from "./verify-account-web-page.reducer";

const verifyAccountPageState = createSelector(verifyAccountModuleState, (state: VerifyAccountModuleState) => {
  if (state) return state.webPage;

  return undefined;
});

export const verifyAccountForm = createSelector(verifyAccountPageState, (state: VerifyAccountWebPageState) => {
  if (state) return state.form;

  return undefined;
});
export const emailOnVerifyForm = createSelector(verifyAccountPageState, (state: VerifyAccountWebPageState) => {
  if (state) return state.form.get('email').value;

  return undefined;
});
export const tokenOnVerifyForm = createSelector(verifyAccountPageState, (state: VerifyAccountWebPageState) => {
  if (state) return state.form.get('token').value;

  return undefined;
});
