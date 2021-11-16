import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { Query } from 'src/app/modules/shared/common/query';

export const START_FILTERING_PUBLISHER_CYCLES = createAction('[BOOKS] Filter publisher cycles', props<{ payload: { query: Query } }>());
export const STOP_FILTERING_PUBLISHER_CYCLES = createAction('[BOOKS] Stop filtering publisher cycles');
export const FETCH_FILTERED_PUBLISHER_CYCLES = createAction('[BOOKS] Fetch filtered publisher cycles', props<{ payload: { cycles: PublisherCycle[] } }>());
export const FILTER_PUBLISHER_CYCLES_FALIURE = createAction('[BOOKS] Filter publisher cycles faliure', props<{ payload: { error: ApiError } }>());
