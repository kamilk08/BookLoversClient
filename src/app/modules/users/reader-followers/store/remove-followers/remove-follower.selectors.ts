import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from "..";
import { RemoveFollowerState } from "./remove-follower.reducer";

const removeFollowerState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => {
  if (state) return state.removeFollowerState

  return undefined;
});

export const removingFollower = createSelector(removeFollowerState, (state: RemoveFollowerState) => {
  if (state) return state.processing;

  return undefined;
})
