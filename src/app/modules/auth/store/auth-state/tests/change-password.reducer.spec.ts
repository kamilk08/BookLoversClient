import { ApiError } from 'src/app/modules/api/api-error.model';
import { ChangePassword } from 'src/app/modules/api/auth/models/change-password.model';
import * as fromActions from '../change-password/change-password.actions';
import * as fromReducer from '../change-password/change-password.reducer';

describe('change password reducer', () => {
  const initialState: fromReducer.ChangePasswordState = {
    success: undefined,
    processing: false,
    error: undefined
  }

  describe('CHANGE_PASSWORD', () => {
    it('should return new state with processing state switched to true', () => {
      const model = new ChangePassword('email', 'username', 'password', 'newPassword');

      const action = fromActions.CHANGE_PASSWORD({ payload: { model } });

      const newState = fromReducer.changePasswordReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    })
  });

  describe('CHANGE_PASSWORD_FALIURE', () => {
    it('should return new state with processing state switched to false and success to false', () => {
      const action = fromActions.CHANGE_PASSWORD_FALIURE({ payload: { error: new ApiError() } });
      const newState = fromReducer.changePasswordReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.success).toBeFalsy();

    })
  });

  describe('CHANGE_PASSWORD_SUCCESS', () => {
    it('should return new state with processing state switched to false and success to true', () => {
      const action = fromActions.CHANGE_PASSWORD_SUCCESS();
      const newState = fromReducer.changePasswordReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.success).toBeTruthy();
    })
  })
});
