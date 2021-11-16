import { createSelector } from "@ngrx/store";
import { profileModuleState, ProfilesModuleState } from "../..";
import { ChangeProfileFormState } from "./change-profile-form.reducer";

const changeProfileFormState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.changeProfileFormState;

  return undefined;
});

export const changeProfileForm = createSelector(changeProfileFormState, (state: ChangeProfileFormState) => {
  if (state) return state.form;

  return undefined;
});
