import { createSelector } from '@ngrx/store';
import { publisherCyclesState, PublisherCyclesModuleState } from '..';
import { SearchPublisherCycle } from '../search-cycles/search-publisher-cycle.reducer';
import { PublisherCyclesState } from './publisher-cycle.reducer';

const publisherCycleState = createSelector(publisherCyclesState, (state: PublisherCyclesModuleState) => {
  if (state) return state.publisherCycles;

  return undefined;
});

export const publisherCycleById = (publisherCycleId: number) => createSelector(publisherCycleState, (state: PublisherCyclesState) => {
  if (state && publisherCycleById) {
    return state.entities[publisherCycleId];
  }

  return undefined;
})

export const multiplePublisherCycles = (publisherCycleIds: number[]) => createSelector(publisherCycleState, (state: PublisherCyclesState) => {
  if (state && publisherCycleIds) {
    return state.ids
      .filter(p => publisherCycleIds.includes(p))
      .map(id => state.entities[id])
      .filter(f => f !== undefined);
  }

  return undefined;
})



