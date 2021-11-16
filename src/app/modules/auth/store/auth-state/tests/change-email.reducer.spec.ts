
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ChangeEmail } from 'src/app/modules/api/auth/models/change-email.model';
import * as fromActions from '../change-email/change-email.actions';
import * as fromReducer from '../change-email/change-email.reducer';
import { ChangeEmailState } from '../change-email/change-email.reducer';

describe('change email reducer', () => {
  const initialState: ChangeEmailState = {
    processing: false,
    error: undefined
  }

  describe('CHANGE_EMAIL', () => {
    it('should return new state with processing property set to true', () => {
      const model = new ChangeEmail('username', 'password', 'email', 'previousEmail')
      const action = fromActions.CHANGE_EMAIL({ payload: { model } });

      const newState = fromReducer.changeEmailReducer(initialState, action);

      expect(newState.processing).toBeTruthy()

    });
  });

  describe('CHANGE_EMAIL_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {
      const action = fromActions.CHANGE_EMAIL_SUCCESS({ payload: { model: new ChangeEmail('model', 'model', 'model', 'model') } });

      const newState = fromReducer.changeEmailReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('CHANGE_EMAIL_FALIURE', () => {
    it('should return new state with defined error property and processing set to false', () => {

      const action = fromActions.CHANGE_EMAIL_FALIURE({ payload: { error: new ApiError() } });

      const newState = fromReducer.changeEmailReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })
  })
});
