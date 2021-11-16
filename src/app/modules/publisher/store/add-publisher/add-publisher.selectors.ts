import { createSelector } from "@ngrx/store";
import { publishersModuleState, PublishersModuleState } from "..";
import { AddPublisherState } from "./add-publisher.reducer";


const addPublisherState = createSelector(publishersModuleState, (state: PublishersModuleState) => {
  if (state) return state.addPublisher;

  return undefined;
});
export const addedPublisher = createSelector(addPublisherState, (state: AddPublisherState) => {
  if (state) return state.addedPublisher;

  return undefined;
});
