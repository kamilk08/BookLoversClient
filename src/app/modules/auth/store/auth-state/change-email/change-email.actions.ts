import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ChangeEmail } from 'src/app/modules/api/auth/models/change-email.model';

export const CHANGE_EMAIL = createAction('[AUTH] Change email', props<{ payload: { model: ChangeEmail } }>());
export const CHANGE_EMAIL_SUCCESS = createAction('[AUTH] Change email success', props<{ payload: { model: ChangeEmail } }>());
export const CHANGE_EMAIL_FALIURE = createAction('[AUTH] change email faliure', props<{ payload: { error: ApiError } }>());
