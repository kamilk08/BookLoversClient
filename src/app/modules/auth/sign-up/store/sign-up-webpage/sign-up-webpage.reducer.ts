import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { isEmailUnique } from "../../index/services/is-email-unique.validator";
import { IsUsernameUnique } from "../../index/services/is-username-unique.validator";
import * as fromActions from './sign-up-webpage.actions';

export interface SignUpWebPageState {
  form: FormGroup
}

const initialState: SignUpWebPageState = {
  form: createSignUpForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_SIGN_UP_FORM, (state, action) => ({ ...state, form: action.payload.form })),
  on(fromActions.INITIALIZE_SIGN_UP_FORM, (state) => ({ ...state })),
  on(fromActions.SIGN_UP_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.SIGN_UP_FORM_INVALID, (state) => {
    updateFormValidity(state.form);
    const form = state.form;

    return { ...state, form: new FormGroup(form.controls, [CommonValidators.passwordMatcher('password', 'repeatPassword')]) }
  }),
  on(fromActions.SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR, (state, action) => {
    let form = state.form;
    form.get('email').setAsyncValidators(isEmailUnique(action.payload.api));

    return { ...state, form: new FormGroup(form.controls, [CommonValidators.passwordMatcher('password', 'repeatPassword')]) }
  }),
  on(fromActions.SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR, (state, action) => {
    let form = state.form;
    form.get('username').setAsyncValidators(IsUsernameUnique(action.payload.api));

    return { ...state, form: new FormGroup(form.controls, [CommonValidators.passwordMatcher('password', 'repeatPassword')]) }
  }),
  on(fromActions.RESET_SIGN_UP_FORM, (state) => {
    state.form.reset();
    return { ...state, form: new FormGroup(state.form.controls, [CommonValidators.passwordMatcher('password', 'repeatPassword')]) }
  })
);

export function signUpWebPageReducer(state: SignUpWebPageState, action: Action) {
  return reducer(state, action);
}


function createSignUpForm() {
  return new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3),
    CommonValidators.cannotContainSpace], []),
    email: new FormControl('', [Validators.required, Validators.email], []),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
    repeatPassword: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]),
    newsletter: new FormControl(false),
  }, [CommonValidators.passwordMatcher('password', 'repeatPassword')])
}
