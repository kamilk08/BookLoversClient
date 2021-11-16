import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from "..";
import { FollowersPageOption, FollowersPageState } from "./followers-page.reducer";

const followersPageState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => {
  if (state) return state.followersPageState;

  return undefined;
});

export const readerId = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.readerId;

  return undefined;
});
export const pageSize = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.pageSize;

  return undefined;
});
export const searchPhrase = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.searchPhrase;

  return undefined;
});

export const currentFollowersCount = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.currentFollowersCount;

  return undefined;
});
export const currentFollowingsCount = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.currentFollowingsCount;

  return undefined;
});

export const showFollowers = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.pageOption === FollowersPageOption.SHOW_FOLLOWERS;

  return undefined;
});
export const showFollowings = createSelector(followersPageState, (state: FollowersPageState) => {
  if (state) return state.pageOption === FollowersPageOption.SHOW_FOLLOWINGS;

  return undefined;
});
