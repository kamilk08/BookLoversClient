import { createSelector } from "@ngrx/store";
import { PublishersModuleState, publishersModuleState } from "..";
import { PublisherBooksState } from "./publisher-books.reducer";

const paginationState = createSelector(publishersModuleState, (state: PublishersModuleState) => {
  if (state) return state.publisherBooksPagination;

  return undefined;
});


export const pageResult = createSelector(paginationState, (state: PublisherBooksState) => {
  if (state) return state.pageResult;

  return undefined;
});

export const publisherBooksIds = createSelector(pageResult, (state) => {
  if (state) return state.items;

  return undefined;
})

export const processingPublisherBooks = createSelector(paginationState, (state: PublisherBooksState) => {
  if (state) return state.processing;

  return undefined;
});

