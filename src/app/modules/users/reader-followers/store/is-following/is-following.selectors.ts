import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from "..";
import { IsFollowingState } from "./is-following.reducer";

const isFollowingState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => {
  if (state) return state.isFollowingState;

  return undefined;
});

export const isFollowing = (followedId: number) => createSelector(isFollowingState, (state: IsFollowingState) => {
  if (state && followedId) return state.entities[followedId];

  return undefined;
});
