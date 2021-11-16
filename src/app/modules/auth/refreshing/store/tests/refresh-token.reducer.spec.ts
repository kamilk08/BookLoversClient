import { CurrentRefreshTokenState } from "../refresh-token.reducer";
import * as fromActions from '../refresh-token.actions';
import * as fromReducer from '../refresh-token.reducer';
import { ApiError } from "src/app/modules/api/api-error.model";

describe('Refresh token reducer', () => {

  const initialState: CurrentRefreshTokenState = {
    refreshToken: undefined,
    isRefreshing: false,
    isSuccess: false,
    error: undefined
  };


  describe('REFRESH_TOKEN', () => {
    it('should return new state with isRefreshing set to true', () => {
      const action = fromActions.REFRESH_TOKEN({ payload: { refreshToken: 'token' } });

      const newState = fromReducer.refreshTokenReducer(initialState, action);

      expect(newState.isRefreshing).toBeTruthy();
    })
  });

  describe('REFRESH_TOKEN_FALIURE', () => {
    it('should return new state with isRefresing and error property changed', () => {
      const action = fromActions.REFRESH_TOKEN_FALIURE({ payload: { error: new ApiError() } });

      const newState = fromReducer.refreshTokenReducer(initialState, action);

      expect(newState.isRefreshing).toBeFalsy();
      expect(newState.error).toBe(action.payload.error);
    })
  });

  describe('REFRESH_TOKEN_SUCCESS', () => {
    it('should return new state with isRefreshing and token property changed', () => {
      const action = fromActions.REFRESH_TOKEN_SUCCESS({ payload: { refreshToken: 'token' } });

      const newState = fromReducer.refreshTokenReducer(initialState, action);

      expect(newState.isRefreshing).toBeFalsy();
      expect(newState.refreshToken).toBe(action.payload.refreshToken);
    })
  });

});
