import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";

export const INITIALIZE_SIGN_UP_FORM = createAction('[SIGN_UP] Initialize sign up form');
export const SUBMIT_SIGN_UP_FORM = createAction('[SIGN_UP] Submit sign up form', props<{ payload: { form: FormGroup } }>());
export const SIGN_UP_FORM_VALID = createAction('[SIGN_UP] Sign up form valid');
export const SIGN_UP_FORM_INVALID = createAction('[SIGN_UP] Sign up form invalid');
export const RESET_SIGN_UP_FORM = createAction('[SIGN_UP] Restet sign up form');

export const SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR = createAction('[SIGN_UP] Set username uniqueness validator', props<{ payload: { api: SignUpApi } }>());
export const SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR = createAction('[SIGN_UP] Set email uniqueness validator', props<{ payload: { api: SignUpApi } }>());

