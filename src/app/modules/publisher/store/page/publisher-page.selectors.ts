import { createSelector } from "@ngrx/store";
import { publishersModuleState, PublishersModuleState } from "..";
import { PublisherPageState } from "./publisher-page.reducer";

const publisherWebPage = createSelector(publishersModuleState, (state: PublishersModuleState) => {
  if (state) return state.publisherWebPage;

  return undefined;
});

export const descending = createSelector(publisherWebPage, (state: PublisherPageState) => {
  if (state) return state.descending;

  return undefined;
});
export const sortType = createSelector(publisherWebPage, (state: PublisherPageState) => {
  if (state) return state.sortType;

  return undefined;
});
export const searchPhrase = createSelector(publisherWebPage, (state: PublisherPageState) => {
  if (state) return state.phrase;

  return undefined;
});
export const publisherId = createSelector(publisherWebPage, (state: PublisherPageState) => {
  if (state) return state.publisherId;

  return undefined;
});
export const booksCount = createSelector(publisherWebPage, (state: PublisherPageState) => {
  if (state) return state.booksCount;

  return undefined;
});
