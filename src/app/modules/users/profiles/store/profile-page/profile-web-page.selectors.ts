import { createSelector } from "@ngrx/store";
import { profileModuleState, ProfilesModuleState } from "..";
import { ProfileWebPageState } from "./profile-web-page.reducer";

const profileWebPageState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.webPage;

  return undefined;
});

export const readerId = createSelector(profileWebPageState, (state: ProfileWebPageState) => {
  if (state) return state.readerId;

  return undefined;
});
