import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromActions from '../verify-account-web-page.actions';
import * as fromReducer from '../verify-account-web-page.reducer';
import { VerifyAccountWebPageState } from '../verify-account-web-page.reducer';


describe('Verify account web page reducer', () => {
  describe('SUBMIT_VERIFY_ACCOUNT_FORM', () => {
    it('should assign modified instance of form to reducer form property', () => {
      const initialState: VerifyAccountWebPageState = {
        form: undefined,
        error: undefined
      };

      const form = new FormGroup({
        token: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      });

      const action = fromActions.SUBMIT_VERIFY_ACCOUNT_FORM({ payload: { form } });
      const state:VerifyAccountWebPageState = fromReducer.verifyAccountWebPageReducer(initialState, action);

      expect(state.form).toBeDefined();
    })
  });

  describe('VERIFY_ACCOUNT_FORM_VALID', () => {
    it('should return state with new instance of form property', () => {
      const form = new FormGroup({
        token: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      });

      const initialState: VerifyAccountWebPageState = {
        form: form,
        error: undefined
      };
      const action = fromActions.VERIFY_ACCOUNT_FORM_VALID();
      const state = fromReducer.verifyAccountWebPageReducer(initialState, action);

      expect(state.form).not.toEqual(form);
    });
  });

  describe('VERIFY_ACCOUNT_FORM_INVALID', () => {
    it('should return state with new instance of form property with updated form validity', () => {
      const form = new FormGroup({
        token: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      });

      const initialState: VerifyAccountWebPageState = {
        form: form,
        error: undefined
      };
      const action = fromActions.VERIFY_ACCOUNT_FORM_INVALID();
      const state = fromReducer.verifyAccountWebPageReducer(initialState, action);

      expect(state.form.valid).toBe(false);
      expect(state.form.get('token').valid).toBe(false);
      expect(state.form.get('email').valid).toBe(false);
    })
  });

  describe('RESET_VERIFY_ACCOUNT_FORM', () => {
    it('should return state new form with reseted values', () => {
      const form = new FormGroup({
        token: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      });

      const initialState: VerifyAccountWebPageState = {
        form: form,
        error: undefined
      };
      const action = fromActions.RESET_VERIFY_ACCOUNT_FORM();
      const state = fromReducer.verifyAccountWebPageReducer(initialState, action);

      expect(state.form).not.toEqual(form);
    })

  })
})
