import { createSelector } from "@ngrx/store";
import { publisherCyclesState, PublisherCyclesModuleState } from "..";
import { SearchPublisherCycle } from "./search-publisher-cycle.reducer";

const publisherCyclesSearchState = createSelector(publisherCyclesState, (state: PublisherCyclesModuleState) => {
  if (state) return state.searchPublisherCycle;

  return undefined;
});

export const isPublisherCycleFiltered = createSelector(publisherCyclesSearchState, (state: SearchPublisherCycle) => {
  if (state) return state.processing;

  return undefined;

});
export const searchedPublisherCycles = createSelector(publisherCyclesSearchState, (state: SearchPublisherCycle) => {
  if (state) return state.entities;

  return undefined;
});
