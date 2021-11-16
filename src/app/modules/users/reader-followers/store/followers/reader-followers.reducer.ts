import { Follower } from 'src/app/modules/shared';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './reader-followers.actions';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface ReaderFollowersState {
  entities: { [readerId: number]: Follower[] },
  ids: number[]
  processing: boolean
  error: ApiError
}

const initialState: ReaderFollowersState = {
  entities: [],
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.FETCH_READER_FOLLOWERS, (state, action) => {
    const ids = state.ids;
    if (!ids.includes(action.payload.readerId))
      ids.push(action.payload.readerId);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.followers }, ids: ids, processing: false };
  }),
  on(fromActions.FETCH_READER_FOLLOWERS_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  }),
  on(fromActions.ADD_FOLLOWER_TO_READER, (state, action) => {
    const entities = state.entities[action.payload.followedId];
    entities.push(new Follower(action.payload.followedId, action.payload.followedById));

    return { ...state, entities: { ...state.entities, [action.payload.followedId]: entities } };
  }),
  on(fromActions.REMOVE_FOLLOWER_FROM_READER, (state, action) => {
    const entities = state.entities[action.payload.followedId];
    const index = entities.findIndex(f => f.followedById === action.payload.followedById);
    entities.splice(index, 1);

    return { ...state, entities: { ...state.entities, [action.payload.followedId]: entities } }
  })
);

export function readerFollowersReducer(state: ReaderFollowersState, action: Action) {
  return reducer(state, action);
}
