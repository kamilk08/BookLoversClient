import { Action, createReducer, on } from "@ngrx/store"
import { ApiError } from "src/app/modules/api/api-error.model";
import * as fromActions from './is-following.actions';

export interface IsFollowingState {
  entities: { [readerId: number]: boolean },
  processing: boolean,
  error: ApiError
}

const initialState: IsFollowingState = {
  entities: {},
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.IS_FOLLOWING, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_IS_FOLLOWING_STATE, (state, action) => {
    return { ...state, entities: { ...state.entities, [action.payload.followedId]: action.payload.flag } }
  }),
  on(fromActions.FETCH_IS_FOLLOWING_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function isFollowingReducer(state: IsFollowingState, action: Action) {
  return reducer(state, action);
}
