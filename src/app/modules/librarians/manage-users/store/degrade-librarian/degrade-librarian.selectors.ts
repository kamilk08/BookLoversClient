import { createSelector } from "@ngrx/store";
import { manageUsersModuleState, ManageLibrarianModuleState } from "..";
import { DegradeLibrarianState } from "./degrade-librarian.reducer";

const degradingLibrarianState = createSelector(manageUsersModuleState, (state: ManageLibrarianModuleState) => {
  if(state) return state.degradeLibrarianState;

  return undefined;
});

export const degradingLibrarian = createSelector(degradingLibrarianState, (state: DegradeLibrarianState) => {
  if(state) return state.processing;

  return undefined;
});
