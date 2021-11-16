import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";

export const SUBMIT_PASSWORD_TOKEN_FORM = createAction('[AUTH] Submit password token form', props<{ payload: { form: FormGroup } }>());
export const PASSWORD_TOKEN_FORM_INVALID = createAction('[AUTH] Password toke form invalid');
export const GENERATE_PASSWORD_TOKEN = createAction('[AUTH] Generate password token', props<{ payload: { email: string } }>());
export const GENERATE_PASSWORD_TOKEN_FALIURE = createAction('[AUTH] Generate password token faliure', props<{ payload: { error: ApiError } }>());
export const GENERATE_PASSWORD_TOKEN_SUCCESS = createAction('[AUTH] Generate password token success');
