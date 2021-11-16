import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";

import * as fromActions from './generate-token.actions';

export interface GenerateTokenState {
  form: FormGroup,
  email: string,
  processing: boolean,
  error: ApiError
}

const inititalState: GenerateTokenState = {
  form: new FormGroup({
    email: new FormControl(undefined, [Validators.required])
  }),
  email: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(inititalState,
  on(fromActions.SUBMIT_PASSWORD_TOKEN_FORM, (state, action) => {
    return { ...state, form: new FormGroup(action.payload.form.controls) }
  }),
  on(fromActions.PASSWORD_TOKEN_FORM_INVALID, (state) => {
    const form = state.form;

    updateFormValidity(form);

    return { ...state, form }
  }),
  on(fromActions.GENERATE_PASSWORD_TOKEN, (state, action) => {
    return { ...state, email: action.payload.email }
  }),
  on(fromActions.GENERATE_PASSWORD_TOKEN_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  }),
  on(fromActions.GENERATE_PASSWORD_TOKEN_SUCCESS, (state) => {
    return { ...state, processing: false }
  })
);

export function generateTokenReducer(state: GenerateTokenState, action: Action) {
  return reducer(state, action);
}
