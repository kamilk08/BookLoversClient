import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const SET_REFRESH_TOKEN = createAction('[AUTH] Set refresh token', props<{ payload: { refreshToken: string } }>());
export const REFRESH_TOKEN = createAction('[AUTH] Refresh token', props<{ payload: { refreshToken: string } }>());
export const REFRESH_TOKEN_SUCCESS = createAction('[AUTH] Refresh token success', props<{ payload: { refreshToken: string } }>());
export const REFRESH_TOKEN_FALIURE = createAction('[AUTH] Refresh token faliure', props<{ payload: { error: ApiError } }>());
