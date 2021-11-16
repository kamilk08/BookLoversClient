import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { ChangeEmailFormState } from "../change-email-form.reducer";

import * as fromActions from '../change-email-form.actions';
import * as fromReducer from '../change-email-form.reducer';
import { TestBed } from "@angular/core/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { HttpClientModule } from "@angular/common/http";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";

describe('CHANGE_EMAIL_FORM_REDUCER', () => {

  let api: SignUpApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule]
    });

    api = TestBed.get(SignUpApi);
  });

  const initialState: ChangeEmailFormState = {
    form: createChangeEmailForm()
  };

  describe('SUBMIT_CHANGE_EMAIL_FORM', () => {
    it('should return new state with updated form', () => {

      const form = initialState.form;
      form.get('oldEmail').setValue('value');
      form.updateValueAndValidity();

      const action = fromActions.SUBMIT_CHANGE_EMAIL_FORM({ payload: { form } });

      const newState = fromReducer.changeEmailFormReducer(initialState, action);

      expect(newState.form).toEqual(form);

    });
  });

  describe('SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR', () => {
    it('should return new state with updated form', () => {

      const action = fromActions.SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR({ payload: { api } });

      const newState = fromReducer.changeEmailFormReducer(initialState, action);

      expect(newState.form.get('newEmail').asyncValidator).toBeDefined();

    });
  });

  describe('CHANGE_EMAIL_FORM_INVALID', () => {
    it('should return new state with updated form', () => {

      const action = fromActions.CHANGE_EMAIL_FORM_INVALID()

      const newState = fromReducer.changeEmailFormReducer(initialState, action);

      expect(newState.form.get('password').valid).toBeFalsy();
    });
  });

});

function createChangeEmailForm() {
  return new FormGroup({
    oldEmail: new FormControl('', [Validators.required, Validators.email]),
    newEmail: new FormControl('', [Validators.required, Validators.email], []),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase])
  })
}
