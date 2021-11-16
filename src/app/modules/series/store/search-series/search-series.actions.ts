import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Query } from 'src/app/modules/shared/common/query';
import { Series } from '../../../api/series/models/series.model';

export const START_FILTERING_SERIES = createAction('[SERIES] Start filtering series', props<{ payload: { query: Query } }>());
export const STOP_FILTERING_SERIES = createAction('[SERIES] Stop filtering series');
export const FETCH_FILTERED_SERIES = createAction('[SERIES] Fetch filtered series', props<{ payload: { series: Series[] } }>());
export const FILTER_SERIES_FALIURE = createAction('[SERIES] Filter series faliure', props<{ payload: { error: ApiError } }>());
export const SERIES_FILTERED = createAction('[SERIES] Series filtered');
