import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from "..";
import { AddFollowerState } from "./add-follower.reducer";

const addFollowersState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => {
  if (state) return state.addFollowerState;

  return undefined;
});

export const addingFollower = createSelector(addFollowersState, (state: AddFollowerState) => {
  if (state) return state.processing;

  return undefined;
});
