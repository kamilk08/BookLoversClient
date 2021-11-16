import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Series } from '../../../api/series/models/series.model';

export const ADD_SERIES = createAction('[SERIES] Add series', props<{ payload: { series: Series } }>());
export const ADD_SERIES_FALIURE = createAction('[SERIES] Add series faliure', props<{ payload: { model: ApiError } }>());
export const ADD_SERIES_SUCCESS = createAction('[SERIES] Add series success', props<{ payload: { seriesId: number } }>());
