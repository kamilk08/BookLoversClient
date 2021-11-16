import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from './refresh-token.actions';

export interface CurrentRefreshTokenState {
  refreshToken: string;
  isRefreshing: boolean;
  isSuccess: boolean,
  error: ApiError
}

const initialState: CurrentRefreshTokenState = {
  refreshToken: undefined,
  isRefreshing: false,
  isSuccess: undefined,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SET_REFRESH_TOKEN, (state, action) => ({ ...state, isRefreshing: false, refreshToken: action.payload.refreshToken, isSuccess: true })),
  on(fromActions.REFRESH_TOKEN, (state) => ({ ...state, refreshToken: undefined, isRefreshing: true, isSuccess: undefined })),
  on(fromActions.REFRESH_TOKEN_SUCCESS, (state, action) => ({ ...state, refreshToken: action.payload.refreshToken, isRefreshing: false, isSuccess: true })),
  on(fromActions.REFRESH_TOKEN_FALIURE, (state, action) => ({ ...state, error: action.payload.error, isRefreshing: false, isSuccess: false }))
)

export function refreshTokenReducer(state: CurrentRefreshTokenState, action: Action) {
  return reducer(state, action);
}
