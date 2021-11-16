import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Follower } from 'src/app/modules/shared';
import * as fromActions from './followings.actions';

export interface ReaderFollowingsState {
  entities: { [readerId: number]: Follower[] },
  ids: number[],
  error: ApiError
}

const initialState: ReaderFollowingsState = {
  entities: {},
  ids: [],
  error: undefined
};


const reducer = createReducer(initialState,
  on(fromActions.FETCH_READER_FOLLOWINGS, (state, action) => {
    const ids = state.ids;
    if (!ids.includes(action.payload.readerId))
      ids.push(action.payload.readerId);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.followings }, ids: ids }
  }),
  on(fromActions.FETCH_READER_FOLLOWINGS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error }
  }),
  on(fromActions.ADD_FOLLOWING_TO_READER, (state, action) => {
    const entities = state.entities[action.payload.followedById];
    entities.push(new Follower(action.payload.followedObjectId, action.payload.followedById));

    return { ...state, entities: { ...state.entities, [action.payload.followedById]: entities } }
  }),
  on(fromActions.REMOVE_FOLLOWING_FROM_READER, (state, action) => {
    const entities = state.entities[action.payload.followedById];
    const index = entities.findIndex(p => p.followedObjectId === action.payload.followedObjectId);
    if (index !== -1)
      entities.splice(index, 1);

    return { ...state, entities: { ...state.entities, [action.payload.followedById]: entities } }
  })
);

export function readerFollowingsReducer(state: ReaderFollowingsState, action: Action) {
  return reducer(state, action);
}
