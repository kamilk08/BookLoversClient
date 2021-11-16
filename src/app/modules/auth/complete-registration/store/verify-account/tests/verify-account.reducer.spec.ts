import * as fromReducer from '../verify-account.reducer';
import * as fromActions from '../verify-account.actions';
import { VerifyAccount } from 'src/app/modules/api/auth/complete-registration/models/account-verification.model';
import { ApiError } from 'src/app/modules/api/api-error.model';



describe('Verify account reducer', () => {
  const initialState: fromReducer.VerifyAccountState = {
    redirected: undefined,
    error: undefined,
    tryingToVerify: undefined
  };

  describe('VERIFY_ACCOUNT', () => {
    it('should change trying to verify property in reducer state', () => {

      const model = new VerifyAccount('email', 'token');

      const action = fromActions.VERIFY_ACCOUNT({ payload: { model } });

      const newState = fromReducer.verifyAccountReducer(initialState, action);
      expect(newState.tryingToVerify).toBeTruthy();
    })
  });
  describe('VERIFY_ACCOUNT_SUCCESS', () => {
    it('should change redirected to true and tryingToVerify to false', () => {
      const action = fromActions.VERIFY_ACCOUNT_SUCCESS();

      const newState = fromReducer.verifyAccountReducer(initialState, action);

      expect(newState.redirected).toBeTruthy();
      expect(newState.tryingToVerify).toBeFalsy();
    })
  });
  describe('VERIFY_ACCOUNT_FALIURE', () => {
    it('should change redirected to false, tryingToVerify to false and error to action payload error', () => {
      const error = new ApiError();

      const action = fromActions.VERIFY_ACCOUNT_FALIURE({ payload: { error } });

      const newState = fromReducer.verifyAccountReducer(initialState, action);

      expect(newState.error).toBe(error);
      expect(newState.redirected).toBeFalsy();
      expect(newState.tryingToVerify).toBeFalsy();
    })
  })

})
