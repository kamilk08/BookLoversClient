import { createSelector } from "@ngrx/store";
import { profileModuleState, ProfilesModuleState } from "../..";
import { ChangePasswordFormState } from "./change-password-form.reducer";

const changePasswordFormState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.changePasswordFormState;

  return undefined;
});

export const changePasswordForm = createSelector(changePasswordFormState, (state: ChangePasswordFormState) => {
  if (state) return state.form;

  return undefined;
});
