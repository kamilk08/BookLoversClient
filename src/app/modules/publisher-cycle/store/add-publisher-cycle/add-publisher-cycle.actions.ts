import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';

export const ADD_PUBLISHER_CYCLE = createAction('[PUBLISHER_CYCLES] Add publisher cycle', props<{ payload: { publisherCycle: PublisherCycle } }>());
export const ADD_PUBLISHER_CYCLE_SUCCESS = createAction('[PUBLISHER_CYCLES] Add publisher cycle success', props<{ payload: { publisherCycleId: number } }>());
export const ADD_PUBLISHER_CYCLE_FALIURE = createAction('[PUBLISHER_CYCLES] Add publisher cycle faliure', props<{ payload: { model: ApiError } }>());
