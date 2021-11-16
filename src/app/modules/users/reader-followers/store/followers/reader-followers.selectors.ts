import { createSelector } from "@ngrx/store";
import { readerFollowersState, ReaderFollowersModuleState } from '..';
import { ReaderFollowersState } from './reader-followers.reducer';

const readerFollowers = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => state.followersState);

export const followers = (readerId: number) => createSelector(readerFollowers, (state: ReaderFollowersState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const takeFirstTenFollowers = (readerId: number) => createSelector(followers(readerId), (state) => {
  if (state) {
    return state.take(10);
  }

  return undefined;
});

export const followersCount = (readerId: number) => createSelector(followers(readerId), (state) => {
  if (state) {
    return state.length;
  }

  return undefined;
});


export const isFollowedBy = (followedId: number, followedById: number) => createSelector(followers(followedId), (state) => {
  if (state) {
    const index = state.findIndex(f => f.followedById == followedById);
    return index !== -1 ? true : false;
  }

  return undefined;
})
