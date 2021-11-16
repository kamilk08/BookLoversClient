import { createSelector } from "@ngrx/store";
import { booksModuleState, BooksModuleState } from "..";
import { BooksPagination } from "./books-pagination.reducer";

const booksPaginationState = createSelector(booksModuleState, (state: BooksModuleState) => {
  if (state)
    return state.pagination;

  return undefined;
});


export const pageResult = createSelector(booksPaginationState, (state: BooksPagination) => {
  if (state) return state.pageResult;

  return undefined;
});

export const paginatedBookIds = createSelector(pageResult, (state) => {
  if (state)  return state.items;

  return undefined;
});

//+1 IS ADDED BECAUSE FIRST PAGE HAS ZERO INDEX
//AND CLIENT PAGINATION STARTS FROM PAGE INDEX = 1;
export const currentPage = createSelector(pageResult, (state) => {
  if (state)  return state.page + 1;

});

export const totalItems = createSelector(pageResult, (state) => {
  if (state)  return state.totalItems;

})

export const nextPageProcessing = createSelector(booksPaginationState, (state: BooksPagination) => {
  if (state) return state.processing;

  return undefined;
});
