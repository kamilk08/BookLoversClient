import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromActions from '../sign-in/sign-in.actions';
import * as fromReducer from '../sign-in/sign-in.reducer';
import { SignInPageState } from '../sign-in/sign-in.reducer';

import { Credentials } from 'src/app/modules/api/auth/sign-in/models/credentials.model';

describe('Sign in reducer', () => {
  const form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    remember: new FormControl(true)
  });

  const initialState: SignInPageState = {
    form: form,
    token: undefined,
    error: undefined,
    processing: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });
  });

  describe('SUBMIT_SIGN_IN_FORM', () => {
    it('should submit sign in form and return new state with valid form', () => {

      form.get('password').patchValue('password');
      form.get('email').patchValue('email');

      form.updateValueAndValidity();

      const action = fromActions.SUBMIT_SIGN_IN_FORM({ payload: { form } });

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.form.valid).toBeTruthy();
    });

    it('should submit invlid sign in form and return new state with invalid form', () => {
      form.get('password').setValue('password');
      form.get('email').setValue(null);

      form.updateValueAndValidity();

      const action = fromActions.SUBMIT_SIGN_IN_FORM({ payload: { form } });

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.form.valid).toBeFalsy();
    })
  })

  describe('SET_SIGN_IN_ERROR_ON_FORM', () => {
    it('should return new state with form that has password control with invalid credentials error', () => {
      const action = fromActions.SET_SIGN_IN_ERROR_ON_FORM();

      const newState = fromReducer.signInReducer(initialState, action);

      const passwordControl = newState.form.get('password');

      expect(passwordControl.hasError('invalidCredentials')).toBeTruthy();
    })
  });

  describe('RESET_SIGN_IN_FORM', () => {
    it('should return new state with changed form', () => {
      const action = fromActions.RESET_SIGN_IN_FORM();

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.form).not.toEqual(form);
    })
  });

  describe('SIGN_IN', () => {
    it('should return new state with processing property switched to true', () => {
      const credentials = new Credentials('email', 'password');

      const action = fromActions.SIGN_IN({ payload: { credentials } });

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    })
  });

  describe('SIGN_IN_SUCCESS', () => {
    it('should return new state with updated token property and processing switched to false', () => {

      const action = fromActions.SIGN_IN_SUCCESS({ payload: { token: 'token' } });

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.token).toBe('token');
    })
  });

  describe('SIGN_IN_FALIURE', () => {
    it('should return new state with updated error property and processing switched to false', () => {
      const error = new Error('something went wrong');

      const action = fromActions.SIGN_IN_FALIURE({ payload: { error } });

      const newState = fromReducer.signInReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.error).toBe(error);
    })
  })

})
