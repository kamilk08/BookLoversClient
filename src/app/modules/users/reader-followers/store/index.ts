import * as fromReaderFollowers from './followers/reader-followers.reducer';
import * as fromAddFollowers from './add-followers/add-follower.reducer';
import * as fromRemoveFollowers from './remove-followers/remove-follower.reducer';
import * as fromFollowersPagination from './followers-pagination/followers-pagination.reducer';
import * as fromFollowingsPagination from './followings-pagination/followings-pagination.reducer';
import * as fromFollowings from './followings/followings.reducer';
import * as fromIsFollowing from './is-following/is-following.reducer';
import * as fromFollowersPageState from './followers-page/followers-page.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface ReaderFollowersModuleState {
  addFollowerState: fromAddFollowers.AddFollowerState,
  followersState: fromReaderFollowers.ReaderFollowersState,
  followersPaginationState: fromFollowersPagination.FollowersPaginationState,
  removeFollowerState: fromRemoveFollowers.RemoveFollowerState,
  followingsState: fromFollowings.ReaderFollowingsState,
  followingsPaginationState: fromFollowingsPagination.ReaderFollowingsPaginationState,
  isFollowingState: fromIsFollowing.IsFollowingState,
  followersPageState: fromFollowersPageState.FollowersPageState
}

const reducerMap: ActionReducerMap<ReaderFollowersModuleState> = {
  addFollowerState: fromAddFollowers.addFollowerReducer,
  followersState: fromReaderFollowers.readerFollowersReducer,
  followersPaginationState: fromFollowersPagination.followersPaginationReducer,
  removeFollowerState: fromRemoveFollowers.removeFollowerReducer,
  followingsState: fromFollowings.readerFollowingsReducer,
  followingsPaginationState: fromFollowingsPagination.readerFollowingsPageReducer,
  isFollowingState: fromIsFollowing.isFollowingReducer,
  followersPageState: fromFollowersPageState.followersPageReducer
};

const reducer = combineReducers(reducerMap);

export function readerFollowersStateReducer(state: ReaderFollowersModuleState, action: Action) {
  return reducer(state, action);
}

export const readerFollowersState = createFeatureSelector('reader-followers');
