import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import * as fromActions from './verify-account-web-page.actions';

export interface VerifyAccountWebPageState {
  form: FormGroup,
  error: Error
}

const initialState: VerifyAccountWebPageState = {
  form: createVerifyForm(),
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM, (state, action) => {
    let form = new FormGroup(action.payload.form.controls);
    return { ...state, form: form }
  }),
  on(fromActions.VERIFY_ACCOUNT_FORM_VALID, (state) => {
    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.VERIFY_ACCOUNT_FORM_INVALID, (state) => {

    updateFormValidity(state.form);
    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.RESET_VERIFY_ACCOUNT_FORM, (state) => {
    state.form.reset();

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error }
  })
)

export function verifyAccountWebPageReducer(state: VerifyAccountWebPageState, action: Action) {
  return reducer(state, action);
}

function createVerifyForm() {
  return new FormGroup({
    token: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
}
