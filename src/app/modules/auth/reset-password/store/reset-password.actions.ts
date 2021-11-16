import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";

export const RESET_PASSWORD = createAction('[AUTH] Reset password', props<{ payload: { token: string, password: string } }>());
export const RESET_PASSWORD_SUCCESS = createAction('[AUTH] Reset password success');
export const RESET_PASSWORD_FALIURE = createAction('[AUTH] Reset password faliure', props<{ payload: { error: ApiError } }>());
