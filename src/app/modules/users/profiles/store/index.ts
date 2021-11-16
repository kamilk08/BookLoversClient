
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromChangeProfile from './change-profile/change-profile.reducer';
import * as fromProfile from './profile/profile.reducer';
import * as fromProfileWebPage from './profile-page/profile-web-page.reducer';
import * as fromChangeEmailFormState from './profile-page/change-email/change-email-form.reducer';
import * as fromChangePasswordFormState from './profile-page/change-password/change-password-form.reducer';
import * as fromChangeProfileFormState from './profile-page/change-profile/change-profile-form.reducer';


export interface ProfilesModuleState {
  changeProfile: fromChangeProfile.ChangeProfileState
  profiles: fromProfile.Profiles,
  webPage: fromProfileWebPage.ProfileWebPageState,
  changeEmailFormState: fromChangeEmailFormState.ChangeEmailFormState,
  changePasswordFormState: fromChangePasswordFormState.ChangePasswordFormState,
  changeProfileFormState: fromChangeProfileFormState.ChangeProfileFormState
};

const reducerMap: ActionReducerMap<ProfilesModuleState> = {
  changeProfile: fromChangeProfile.changeProfileReducer,
  profiles: fromProfile.profileReducer,
  webPage: fromProfileWebPage.profileWebPageReducer,
  changeEmailFormState: fromChangeEmailFormState.changeEmailFormReducer,
  changePasswordFormState: fromChangePasswordFormState.changePasswordFormReducer,
  changeProfileFormState: fromChangeProfileFormState.changeProfileFormReducer
}

const reducer = combineReducers(reducerMap);

export function profilesStateReducer(state: ProfilesModuleState, action: Action) {
  return reducer(state, action);
}

export const profileModuleState = createFeatureSelector('profiles');
