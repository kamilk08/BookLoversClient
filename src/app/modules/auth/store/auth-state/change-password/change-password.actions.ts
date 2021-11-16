import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ChangePassword } from 'src/app/modules/api/auth/models/change-password.model';

export const CHANGE_PASSWORD = createAction('[AUTH] Change password', props<{ payload: { model: ChangePassword } }>());
export const CHANGE_PASSWORD_SUCCESS = createAction('[AUTH] Change password success');
export const CHANGE_PASSWORD_FALIURE = createAction('[AUTH] Change password faliure', props<{ payload: { error: ApiError } }>());
