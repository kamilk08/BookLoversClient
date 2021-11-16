import { ApiError } from 'src/app/modules/api/api-error.model';
import { SignUpModel } from 'src/app/modules/api/auth/sign-up/models/sign-up.model';
import * as fromActions from '../sign-up.actions';
import * as fromReducer from '../sign-up.reducer';
import { SignUpPageState } from '../sign-up.reducer';

describe('sign up reducer', () => {
  const initialState: SignUpPageState = {
    redirected: false,
    error: null,
    tryingToSignUp: false
  };


  describe('SIGN_UP', () => {
    it('should return new state with tryingToSignUp property switched to true', () => {

      const signUpModel = new SignUpModel('username', 'email', 'password');
      const action = fromActions.SIGN_UP({ payload: { signUpModel } });

      const newState = fromReducer.signUpReducer(initialState, action);

      expect(newState.tryingToSignUp).toBeTruthy();
    })
  });

  describe('SIGN_UP_SUCCESS', () => {
    it('should return new state with tryingToSignUp property switched to false and redirected to true', () => {

      const action = fromActions.SIGN_UP_SUCCESS();

      const newState = fromReducer.signUpReducer(initialState, action);

      expect(newState.redirected).toBeTruthy();
      expect(newState.tryingToSignUp).toBeFalsy();
    })
  });

  describe('SIGN_UP_FALIURE', () => {
    it('should return new state with defined error', () => {
      const error = new ApiError();

      const action = fromActions.SIGN_UP_FALIURE({ payload: { error } });

      const newState = fromReducer.signUpReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })
  })


})
