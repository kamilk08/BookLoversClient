import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReaderRatings } from '../../../../api/statistics/models/reader-ratings-statistics.model';

export const SELECT_READER_RATINGS_STATISTICS = createAction('[STATISTICS] Select reader ratings statistics', props<{ payload: { readerId: number } }>());
export const FETCH_READER_RATINGS_STATISTICS = createAction('[STATISTICS] Fetch reader ratings statistics', props<{ payload: { statistics: ReaderRatings } }>());
export const FETCH_READER_RATINGS_STATISTICS_FALIURE = createAction('[STATISTICS] Fetch reader ratings statistics faliure', props<{ payload: { error: ApiError } }>());
