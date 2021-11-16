import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Reader } from '../../../../api/readers/models/reader.model';
import * as fromActions from './remove-follower.actions';

export interface RemoveFollowerState {
  followed: Reader,
  followedBy: Reader,
  processing: boolean,
  error: ApiError
};

const inititalState: RemoveFollowerState = {
  followed: undefined,
  followedBy: undefined,
  processing: undefined,
  error: undefined
};

const reducer = createReducer(inititalState,
  on(fromActions.REMOVE_FOLLOWER, (state, action) => {
    return { ...state, followed: action.payload.followed, followedBy: action.payload.followedBy, processing: true }
  }),
  on(fromActions.REMOVE_FOLLOWER_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_FOLLOWER_FALIURE, (state, action) => ({ ...state, error: action.payload.model, processing: false }))
);

export function removeFollowerReducer(state: RemoveFollowerState, action: Action) {
  return reducer(state, action);
}
