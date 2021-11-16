import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";

export const SUBMIT_CHANGE_EMAIL_FORM = createAction('[PROFILE] Submit change email form', props<{ payload: { form: FormGroup } }>());
export const CHANGE_EMAIL_FORM_VALID = createAction('[PROFILE] Change email form valid', props<{ payload: { form: FormGroup } }>());
export const CHANGE_EMAIL_FORM_INVALID = createAction('[PROFILE] Change email form invalid');
export const SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR = createAction('[PROFILE] Set change email form async validator', props<{ payload: { api: SignUpApi } }>());
export const RESET_CHANGE_EMAIL_FORM = createAction('[PROFILE] Reset change email form');
