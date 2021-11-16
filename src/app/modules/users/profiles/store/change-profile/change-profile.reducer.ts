import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Profile } from '../../../../api/profiles/models/profile.model';

import * as fromActions from './change-profile.actions';

export interface ChangeProfileState {
  profile: Profile
  processing: boolean
  error: ApiError
}

const initialState: ChangeProfileState = {
  profile: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.CHANGE_PROFILE, (state, action) => {
    return { ...state, profile: action.payload.profile, processing: true }
  }),
  on(fromActions.CHANGE_PROFILE_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.CHANGE_PROFILE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function changeProfileReducer(state: ChangeProfileState, action: Action) {
  return reducer(state, action);
}

