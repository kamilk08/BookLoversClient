import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";

export const SUBMIT_CHANGE_PASSWORD_FORM = createAction('[PROFILE] Submit change password form', props<{ payload: { form: FormGroup } }>());
export const CHANGE_PASSWORD_FORM_VALID = createAction('[PROFILE] Change password form valid', props<{ payload: { form: FormGroup } }>());
export const CHANGE_PASSWORD_FORM_INVALID = createAction('[PROFILE] Change password form invalid');
export const RESET_CHANGE_PASSWORD_FORM = createAction('[PROFILE] Reset change password form');
