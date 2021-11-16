import { createSelector } from "@ngrx/store";
import { profileModuleState, ProfilesModuleState } from "../..";
import { ChangeEmailFormState } from "./change-email-form.reducer";

const changeEmailFormState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.changeEmailFormState;

  return undefined;
});

export const changeEmailForm = createSelector(changeEmailFormState, (state: ChangeEmailFormState) => {
  if (state) return state.form;

  return undefined;
});

