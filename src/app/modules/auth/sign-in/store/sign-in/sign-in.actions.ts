import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { JsonToken } from "src/app/modules/api/auth/refreshing-tokens/models/json-token.model";
import { Credentials } from '../../../../api/auth/sign-in/models/credentials.model';

export const SUBMIT_SIGN_IN_FORM = createAction('[AUTH] Submit sign in form', props<{ payload: { form: FormGroup } }>());
export const SIGN_IN_FORM_VALID = createAction('[AUTH] Sign in form valid');
export const SIGN_IN_FORM_INVALID = createAction('[AUTH] Sign in form invalid');
export const SET_SIGN_IN_ERROR_ON_FORM = createAction('[AUTH] Set sign in error on form');
export const RESET_SIGN_IN_FORM = createAction('[AUTH] Reset sign in form');
export const ASSIGN_TOKEN = createAction('[AUTH] Assign token', props<{ payload: { token: JsonToken } }>())
export const SIGN_IN = createAction('[AUTH] Sign in user', props<{ payload: { credentials: Credentials } }>());
export const SIGN_IN_SUCCESS = createAction('[AUTH] Sign in success', props<{ payload: { token: any } }>());
export const SIGN_IN_FALIURE = createAction('[AUTH] Sign in faliure', props<{ payload: { error: any } }>());
