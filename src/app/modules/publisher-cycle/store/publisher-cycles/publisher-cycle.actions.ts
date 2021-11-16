import { createAction, props } from '@ngrx/store';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { Query } from 'src/app/modules/shared/common/query';
import { PublisherCycleNotFound } from '../../models/publisher-cycle-not-found';

export const SELECT_PUBLISHER_CYCLE = createAction('[PUBLISHER_CYCLE] Select publisher cycle', props<{ payload: { id: number } }>());
export const SELECT_MULTIPLE_PUBLISHER_CYCLES = createAction('[PUBLISHER_CYCLE] Select multiple publisher cycles', props<{ payload: { ids: number[], query: Query } }>())
export const FETCH_PUBLISHER_CYCLE = createAction('[PUBLISHER_CYCLE] Fetch publisher cycle', props<{ payload: { cycle: PublisherCycle } }>());
export const FETCH_MULTIPLE_PUBLISHER_CYCLES = createAction('[PUBLISHER_CYCLE] Fetch multiple publisher cycles', props<{ payload: { cycles: PublisherCycle[] } }>());
export const FETCH_PUBLISHER_CYCLE_FALIURE = createAction('[PUBLISHER_CYCLE] Fetch publisher cycle faliure', props<{ payload: { error: any } }>());

export const PUBLISHER_CYCLE_NOT_FOUND = createAction('[PUBLISHER_CYCLE] Publisher cycle not found', props<{ payload: { model: PublisherCycleNotFound } }>());
