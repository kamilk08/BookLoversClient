import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Reader } from '../../../../api/readers/models/reader.model';
import * as fromActions from './add-follower.actions';

export interface AddFollowerState {
  follower: Reader;
  followedBy: Reader;
  processing: boolean;
  error: ApiError;
}

const initialState: AddFollowerState = {
  follower: undefined,
  followedBy: undefined,
  processing: undefined,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_FOLLOWER, (state, action) => {
    return { ...state, followedBy: action.payload.followed, follower: action.payload.followedBy, processing: true }
  }),
  on(fromActions.ADD_FOLLOWER_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.ADD_FOLLOWER_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function addFollowerReducer(state: AddFollowerState, action: Action) {
  return reducer(state, action);
};



