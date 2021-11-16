import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT } from "src/app/modules/shared/common/query";
import { Reader } from "../../../../api/readers/models/reader.model";
import * as fromActions from './followers-page.actions';

export enum FollowersPageOption {
  SHOW_FOLLOWERS = 1,
  SHOW_FOLLOWINGS = 2
}

export interface FollowersPageState {
  readerId: number,
  pageOption: FollowersPageOption,
  pageSize: number,
  searchPhrase: string,
  currentFollowersCount: number,
  currentFollowingsCount: number,

}

const initialState: FollowersPageState = {
  readerId: undefined,
  pageOption: FollowersPageOption.SHOW_FOLLOWERS,
  pageSize: DEFAULT_ITEMS_COUNT,
  searchPhrase: undefined,
  currentFollowersCount: undefined,
  currentFollowingsCount: undefined,
};

const reducer = createReducer(initialState,
  on(fromActions.SET_READER_ID_ON_FOLLOWERS_PAGE, (state, action) => ({ ...state, readerId: action.payload.readerId })),
  on(fromActions.SET_FOLLOWERS_PAGE_OPTION, (state, action) => {
    return { ...state, pageOption: action.payload.pageOption }
  }),
  on(fromActions.SET_CURRENT_FOLLOWERS_COUNT, (state, action) => ({ ...state, currentFollowersCount: action.payload.count })),
  on(fromActions.SET_CURRENT_FOLLOWINGS_COUNT, (state, action) => ({ ...state, currentFollowingsCount: action.payload.count })),
  on(fromActions.SET_FOLLOWERS_PAGE_SIZE, (state, action) => ({ ...state, pageSize: action.payload.pageSize })),
  on(fromActions.SET_SEARCH_PHRASE_ON_FOLLOWERS_PAGE, (state, action) => ({ ...state, searchPhrase: action.payload.phrase })),

);

export function followersPageReducer(state: FollowersPageState, action: Action) {
  return reducer(state, action);
}
