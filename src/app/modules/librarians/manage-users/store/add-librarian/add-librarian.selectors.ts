import { createSelector } from "@ngrx/store";
import { manageUsersModuleState, ManageLibrarianModuleState } from "..";
import { AddLibrarianState } from "./add-librarian.reducer";

const addLibrarianState = createSelector(manageUsersModuleState, (state: ManageLibrarianModuleState) => {
  if (state) return state.addLibrarianState;

  return undefined;
});

export const processingNewLibrarian = createSelector(addLibrarianState, (state: AddLibrarianState) => {
  if (state) return state.processing;

  return undefined;
});
export const newLibrarianModel = createSelector(addLibrarianState, (state: AddLibrarianState) => {
  if (state) return state.model;

  return undefined;
});
