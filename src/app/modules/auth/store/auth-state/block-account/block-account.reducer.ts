import { Action, createReducer, on } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { ApiError } from "src/app/modules/api/api-error.model";
import * as fromActions from './block-account.actions';

export interface BlockAccountState {
  userGuid: UUID,
  processing: boolean,
  error: ApiError
};

const initialState: BlockAccountState = {
  userGuid: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.BLOCK_ACCOUNT, (state, action) => {
    return { ...state, userGuid: action.payload.readerGuid, processing: true }
  }),
  on(fromActions.BLOCK_ACCOUNT_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.BLOCK_ACCOUNT_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function blockAccountReducer(state: BlockAccountState, action: Action) {
  return reducer(state, action);
}
