import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Profile } from '../../../../api/profiles/models/profile.model';

export const CHANGE_PROFILE = createAction('[PROFILE] Change profile', props<{ payload: { profile: Profile } }>());
export const CHANGE_PROFILE_SUCCESS = createAction('[PROFILE] Change profile success', props<{ payload: { profile: Profile } }>());
export const CHANGE_PROFILE_FALIURE = createAction('[PROFILE] Change profile faliure', props<{ payload: { model: ApiError } }>());
