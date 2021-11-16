import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonValidators } from 'src/app/modules/shared/common/validators';
import * as fromActions from '../sign-up-webpage/sign-up-webpage.actions';
import * as fromReducer from '../sign-up-webpage/sign-up-webpage.reducer';
import { SignUpWebPageState } from '../sign-up-webpage/sign-up-webpage.reducer';


describe('Sign up page reducer', () => {

  const initialState: SignUpWebPageState = {
    form: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3),
      CommonValidators.cannotContainSpace], []),
      email: new FormControl('', [Validators.required, Validators.email], []),
      password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
      repeatPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
      newsletter: new FormControl(false),
    }, { validators: [CommonValidators.passwordMatcher('password', 'repeatPassword')] })
  };

  describe('SIGN_UP_FORM_INVALD', () => {
    it('should return new state and update validity on sign up form', () => {

      const action = fromActions.SIGN_UP_FORM_INVALID();
      const newState = fromReducer.signUpWebPageReducer(initialState, action);

      expect(newState.form).not.toBe(initialState.form);
    });
  });

  describe('SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR', () => {
    it('should return new state with form that has an email uniqueness validator', () => {
      const action = fromActions.SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR({
        payload: {
          api: {} as any
        }
      });

      const newState = fromReducer.signUpWebPageReducer(initialState, action);

      expect(newState.form.get('email').asyncValidator).toBeDefined();
    })
  });
  describe('SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR', () => {
    it('should return new state with form that has anusername uniqueness validator', () => {
      const action = fromActions.SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR({
        payload: {
          api: {} as any
        }
      });

      const newState = fromReducer.signUpWebPageReducer(initialState, action);

      expect(newState.form.get('username').asyncValidator).toBeDefined();
    })
  });

  describe('RESET_SIGN_UP_FORM', () => {
    it('should return new state with updated form', () => {
      const action = fromActions.RESET_SIGN_UP_FORM();

      const newState = fromReducer.signUpWebPageReducer(initialState, action);

      expect(newState.form).not.toBe(initialState.form);
    })
  })
});


