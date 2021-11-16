import { createSelector } from "@ngrx/store";
import { readerFollowersState, ReaderFollowersModuleState } from "..";
import { FollowersPaginationState } from './followers-pagination.reducer';

const followersPaginationState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => state.followersPaginationState);

export const followersPageResult = (readerId: number) => createSelector(followersPaginationState, (state: FollowersPaginationState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const currentFollowersPage = (readerId: number) => createSelector(followersPageResult(readerId), (state) => {
  if (state) return state.page + 1;

  return undefined;
});

export const followersTotalItems = (readerId: number) => createSelector(followersPageResult(readerId), state => {
  if (state) return state.totalItems;

  return undefined;
})

export const processingFollowersPage = createSelector(followersPaginationState, (state: FollowersPaginationState) => state.processing);

