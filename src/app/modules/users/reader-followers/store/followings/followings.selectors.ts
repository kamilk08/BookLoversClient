import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from '..';
import { ReaderFollowingsState } from './followings.reducer';

const followingsState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => state.followingsState);

export const readerFollowings = (readerId: number) => createSelector(followingsState, (state: ReaderFollowingsState) => {
  if (readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const hasFollowing = (firstReaderId: number, secondReaderId: number) => createSelector(readerFollowings(firstReaderId), (state) => {
  if (state && secondReaderId) {
    return state.some(s => s.followedObjectId === secondReaderId);
  }

  return undefined;
})
