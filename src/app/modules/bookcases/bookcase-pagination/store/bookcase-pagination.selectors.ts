import { createSelector } from "@ngrx/store";
import { bookcasePaginationModuleState, BookcasePaginationModuleState } from '.';
import { BookcasePage } from './bookcase-pagination.reducer';

const paginationState = createSelector(bookcasePaginationModuleState, (state: BookcasePaginationModuleState) => {
  if (state) return state.pagination;

  return undefined;
});

export const bookcasePagination = createSelector(paginationState, (state: BookcasePage) => state);
export const pageResult = createSelector(paginationState, (state: BookcasePage) => {
  if (state) return state.pageResult;

  return undefined;
});

export const bookcaseBookIds = createSelector(paginationState, (state: BookcasePage) => {
  if (state) return state.ids;

  return undefined;
})

export const currentPage = createSelector(pageResult, (state) => {
  if (state) {
    return state.page + 1;
  }
  return undefined;
});

export const totalItems = createSelector(pageResult, (state) => {
  if (state) {
    return state.totalItems
  };

  return undefined;
});

export const processing = createSelector(paginationState, (state: BookcasePage) => {
  if (state) return state.processing;

  return undefined;
})
