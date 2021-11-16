import { createSelector } from "@ngrx/store";
import { publisherCyclesState, PublisherCyclesModuleState } from '..';
import { AddPublisherCycleState } from './add-publisher-cycle.reducer';

const addPublisherCycleState = createSelector(publisherCyclesState, (state: PublisherCyclesModuleState) => state.addPublisherCycle);

export const createdPublisherCycle = createSelector(addPublisherCycleState, (state: AddPublisherCycleState) => state.publisherCycle);
export const processing = createSelector(addPublisherCycleState, (state: AddPublisherCycleState) => state.processing);
