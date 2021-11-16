import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ChangeAvatar } from '../../../api/avatars/models/change-avatar.model';

export const CHANGE_AVATAR = createAction('[USERS] Change avatar', props<{ payload: { model: ChangeAvatar } }>());
export const CHANGE_AVATAR_SUCCESS = createAction('[USERS] Change avatar success');
export const CHANGE_AVATAR_FALIURE = createAction('[USERS] Change avatar faliure', props<{ payload: { model: ApiError } }>());
