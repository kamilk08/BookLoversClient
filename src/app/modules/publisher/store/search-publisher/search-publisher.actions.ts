import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Query } from 'src/app/modules/shared/common/query';
import { Publisher } from '../../../api/publishers/models/publisher.model';


export const START_FILTERING_PUBLISHERS = createAction('[BOOKS] Start filtering publishers', props<{ payload: { query: Query } }>());
export const STOP_FILTERING_PUBLISHERS = createAction('[BOOKS] Stop filtering publishers');
export const FETCH_FILTERED_PUBLISHERS = createAction('[BOOKS] Fetch filtered publishers', props<{ payload: { publishers: Publisher[] } }>());
export const FILTER_PUBLISHER_FALIURE = createAction('[BOOKS] Filter publisher faliure', props<{ payload: { error: ApiError } }>());

