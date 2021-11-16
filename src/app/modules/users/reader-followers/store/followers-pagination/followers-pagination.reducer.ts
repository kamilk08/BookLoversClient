import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import * as fromActions from './followers-pagination.actions';

export interface FollowersPaginationState {
  entities: { [readerId: number]: PageResult },
  ids: number[]
  processing: boolean,
  error: ApiError
}

const initialState: FollowersPaginationState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_READER_FOLLOWERS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.SET_READER_FOLLOWER_PAGE, (state, action) => {
    const ids = state.ids;
    if (!ids.includes(action.payload.readerId))
      ids.push(action.payload.readerId);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.pageResult }, processing: false }
  }),
  on(fromActions.SET_READER_FOLLOWERS_PAGE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function followersPaginationReducer(state: FollowersPaginationState, action: Action) {
  return reducer(state, action);
}
