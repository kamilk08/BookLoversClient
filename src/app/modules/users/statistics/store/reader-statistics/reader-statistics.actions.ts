import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReaderStatistics } from '../../../../api/statistics/models/reader-statistics.model';

export const SELECT_READER_STATISTICS = createAction('[STATISTICS] Select reader statistics', props<{ payload: { readerId: number } }>());
export const FETCH_READER_STATISTICS = createAction('[STATISTICS] Fetch reader statistics', props<{ payload: { statistics: ReaderStatistics } }>());
export const FETCH_READER_STATISTICS_FALIURE = createAction('[STATISTICS] Fetch reader statistics faliure', props<{ payload: { error: ApiError } }>());

