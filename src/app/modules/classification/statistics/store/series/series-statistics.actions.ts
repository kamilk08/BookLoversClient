import { Action, createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Statistics } from '../../../../api/ratings/statistics/models/statistics';

export const SELECT_SERIES_STATISTICS = createAction('[BOOKS] Select series statistics', props<{ payload: { id: number } }>());
export const SELECT_MULTIPLE_SERIES_STATISTICS = createAction('[BOOKS] Select multiple series statistics', props<{ payload: { ids: number[] } }>());
export const FETCH_SERIES_STATISTICS = createAction('[BOOKS] Fetch series statistics', props<{ payload: { statistics: Statistics } }>());
export const FETCH_MULTIPLE_SERIES_STATISTICS = createAction('[BOOKS] Fetch multiple series statistics', props<{ payload: { statistics: Statistics[] } }>());
export const FETCH_SERIES_STATISTICS_FALIURE = createAction('[BOOKS] Fetch series statistics faliure', props<{ payload: { error: ApiError } }>());
