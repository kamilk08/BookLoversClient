import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Profile } from '../../../../api/profiles/models/profile.model';
import { ProfileNotFound } from '../../models/profile-not-found';

export const SELECT_PROFILE = createAction('[PROFILE] Select profile', props<{ payload: { userId: number } }>());
export const FETCH_PROFILE = createAction('[PROFILE] Fetch profile', props<{ payload: { profileId: number, profile: Profile } }>());
export const FETCH_PROFILE_FALIURE = createAction('[PROFILE] Fetch profile faliure', props<{ payload: { model: ApiError } }>());
export const UPDATE_PROFILE = createAction('[PROFILE] Update profile', props<{ payload: { profile: Profile } }>());

export const PROFILE_NOT_FOUND = createAction('[PROFILE] Profile not found', props<{ payload: { model: ProfileNotFound } }>());
