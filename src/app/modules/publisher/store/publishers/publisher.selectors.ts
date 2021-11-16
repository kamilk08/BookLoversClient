import { createSelector } from "@ngrx/store";
import { publishersModuleState, PublishersModuleState } from "..";
import { PublishersState } from "./publisher.reducer";

const publisherState = createSelector(publishersModuleState, (state: PublishersModuleState) => {
  if (state) return state.publishers;

  return undefined;
});

export const publisherById = (publisherId: number) => createSelector(publisherState, (state: PublishersState) => {
  if (state && publisherId) {
    return state.entities[publisherId];
  }

  return undefined;
});

export const publisherByBookId = (bookId: number) => createSelector(publisherState, (state: PublishersState) => {
  if (state && bookId) {
    let entities = state.ids.map(id => state.entities[id]);
    let publisher = entities.filter(f => f.books.includes(bookId))[0];

    return publisher;
  }

  return undefined;
});

export const error = createSelector(publisherState, (state) => {
  if (state) {
    return state.error;
  }

  return undefined;
})
