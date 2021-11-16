
import { createSelector } from '@ngrx/store';
import { profileModuleState, ProfilesModuleState } from '..';
import { Profiles } from './profile.reducer';

const profileState = createSelector(profileModuleState, (state: ProfilesModuleState) => {
  if (state) return state.profiles;

  return undefined;
});
export const profileById = (id: number) => createSelector(profileState, (state: Profiles) => {
  if (state && id) {
    return state.entities[id];
  }

  return undefined;
});

export const profileByUserId = (userId: number) => createSelector(profileState, (state: Profiles) => {
  if (state && userId) {
    const entities = state.ids.map(id => state.entities[id]);
    return entities.find(f => f.userId === userId);
  }

  return undefined;
});

export const city = (userId: number) => createSelector(profileByUserId(userId), (state) => {
  if (state) return state.address.city;

  return undefined;
});

export const country = (userId: number) => createSelector(profileByUserId(userId), (state) => {
  if (state) return state.address.country;

  return undefined;
});

export const sex = (userId: number) => createSelector(profileByUserId(userId), (state) => {
  if (state) return state.specification.sex;

  return undefined;
});

export const error = createSelector(profileState, (state) => {
  if (state) return state.error;

  return undefined;
})
