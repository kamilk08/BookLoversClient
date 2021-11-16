import { createSelector } from "@ngrx/store";
import { publishersModuleState, PublishersModuleState } from "..";
import { SearchPublisherState } from "./search-publisher.reducer";

const publisherSearchState = createSelector(publishersModuleState, (state: PublishersModuleState) => {
  if (state) return state.searchPublisher;

  return undefined;
});

export const searchedPublishers = createSelector(publisherSearchState, (state: SearchPublisherState) => {
  if (state) return state.entities;

  return undefined;
});
export const isPublisherFiltered = createSelector(publisherSearchState, (state: SearchPublisherState) => {
  if(state) return state.processing;

  return undefined;
});
