import { createSelector } from "@ngrx/store";
import { authModuleState, AuthModuleState } from "../..";
import { BlockAccountState } from "./block-account.reducer";

const blockAccountState = createSelector(authModuleState, (state: AuthModuleState) => {
  if (state) return state.blockAccount;

  return undefined;
});

export const blockingAccount = createSelector(blockAccountState, (state: BlockAccountState) => {
  if (state) return state.processing;

  return undefined;
});
