import { createSelector } from "@ngrx/store";
import { librariansModuleState, LibrariansModuleState } from "..";
import { LibrariansPaginationState } from "./librarians-pagination.reducer";

const librarianPaginationState = createSelector(librariansModuleState, (state: LibrariansModuleState) => {
  if (state) return state.pagination;

  return undefined;
});

export const pageResult = createSelector(librarianPaginationState, (state: LibrariansPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});
export const processing = createSelector(librarianPaginationState, (state: LibrariansPaginationState) => {
  if (state) return state.processing;

  return undefined;
});
