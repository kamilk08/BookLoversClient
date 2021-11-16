import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store"

export const SUBMIT_VERIFY_ACCOUNT_FORM = createAction('[AUTH] Sumbit verify account form', props<{ payload: { form: FormGroup } }>());
export const VERIFY_ACCOUNT_FORM_VALID = createAction('[AUTH] Verify account form valid');
export const VERIFY_ACCOUNT_FORM_INVALID = createAction('[AUTH] Verify account form invalid');
export const RESET_VERIFY_ACCOUNT_FORM = createAction('[AUTH] Reset verify account form')
export const SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE = createAction('[AUTH] Submit verify account falire', props<{ payload: { error: Error } }>())
