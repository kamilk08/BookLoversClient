import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { isEmailUnique } from "src/app/modules/auth/sign-up/index/services/is-email-unique.validator";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import * as fromActions from './change-email-form.actions';

export interface ChangeEmailFormState {
  form: FormGroup
}

const initialState: ChangeEmailFormState = {
  form: createChangeEmailForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR, (state, action) => {
    const form = state.form;
    form.get('newEmail').setAsyncValidators(isEmailUnique(action.payload.api))
    let newForm = new FormGroup(form.controls);

    return { ...state, form: newForm }
  }),
  on(fromActions.SUBMIT_CHANGE_EMAIL_FORM, (state, action) => {
    return { ...state, form: action.payload.form }
  }),
  on(fromActions.CHANGE_EMAIL_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.CHANGE_EMAIL_FORM_INVALID, (state) => {
    updateFormValidity(state.form);
    const newForm = new FormGroup(state.form.controls);
    return { ...state, form: newForm }
  }),
  on(fromActions.RESET_CHANGE_EMAIL_FORM, (state) => {
    state.form.reset();

    return { ...state, form: new FormGroup(state.form.controls) }
  })
)

export function changeEmailFormReducer(state: ChangeEmailFormState, action: Action) {
  return reducer(state, action);
}


function createChangeEmailForm() {
  return new FormGroup({
    oldEmail: new FormControl('', [Validators.required, Validators.email]),
    newEmail: new FormControl('', [Validators.required, Validators.email], []),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase])
  });

}
