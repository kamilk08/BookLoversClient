import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import * as fromActions from './change-password-form.actions';

export interface ChangePasswordFormState {
  form: FormGroup
}

const initialState: ChangePasswordFormState = {
  form: createChangePassowrdForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_CHANGE_PASSWORD_FORM, (state, action) => {
    return { ...state, form: action.payload.form }
  }),
  on(fromActions.CHANGE_PASSWORD_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.CHANGE_PASSWORD_FORM_INVALID, (state) => {
    updateFormValidity(state.form);

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.RESET_CHANGE_PASSWORD_FORM, (state) => {
    state.form.reset();

    return { ...state, form: new FormGroup(state.form.controls) }
  })
);

export function changePasswordFormReducer(state: ChangePasswordFormState, action: Action) {
  return reducer(state, action);
}

function createChangePassowrdForm() {
  return new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    { validators: [CommonValidators.passwordMatcher('newPassword', 'confirmPassword')] })
}
