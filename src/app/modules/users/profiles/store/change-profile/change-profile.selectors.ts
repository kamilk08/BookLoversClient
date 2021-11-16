import { createSelector } from '@ngrx/store';
import { profileModuleState, ProfilesModuleState } from '..';
import { ChangeProfileState } from './change-profile.reducer';

const changeProfileState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.changeProfile;

  return undefined;
});

export const currentProfile$ = createSelector(changeProfileState, (state: ChangeProfileState) => {
  if (state) return state.profile;

  return undefined;
});
export const processing$ = createSelector(changeProfileState, (state: ChangeProfileState) => {
  if (state) return state.processing;

  return undefined;
});

