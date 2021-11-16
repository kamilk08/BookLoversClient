import * as fromActions from './sign-in.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateFormValidity } from 'src/app/modules/shared/common/update-form-validity';

export interface SignInPageState {
  form: FormGroup,
  token: string
  error: any
  processing: boolean
}

const initialState: SignInPageState = {
  form: buldSignInForm(),
  token: undefined,
  error: undefined,
  processing: false
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_SIGN_IN_FORM, (state, action) => {
    return { ...state, form: action.payload.form }
  }),
  on(fromActions.SIGN_IN_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.SIGN_IN_FORM_INVALID, (state) => {
    updateFormValidity(state.form);

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SET_SIGN_IN_ERROR_ON_FORM, (state) => {

    state.form.get('password').setErrors({ invalidCredentials: true })
    state.form.updateValueAndValidity();

    return { ...state }
  }),
  on(fromActions.RESET_SIGN_IN_FORM, (state) => {
    state.form.reset();
    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SIGN_IN, state => ({ ...state, processing: true, error: undefined })),
  on(fromActions.SIGN_IN_SUCCESS, (state, action) => ({ ...state, token: action.payload.token, processing: false })),
  on(fromActions.SIGN_IN_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
)

export function signInReducer(state: SignInPageState, action: Action) {
  return reducer(state, action);
}

function buldSignInForm() {
  return new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    remember: new FormControl(true)
  })
}
