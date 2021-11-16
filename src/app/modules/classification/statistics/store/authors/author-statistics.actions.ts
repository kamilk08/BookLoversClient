import { createAction, props } from '@ngrx/store';
import { Statistics } from '../../../../api/ratings/statistics/models/statistics';

export const SELECT_AUTHOR_STATISTICS = createAction('[RATINGS] Select author statistics', props<{ payload: { authorId: number } }>());
export const FETCH_AUTHOR_STATISTICS = createAction('[RATINGS] Fetch author statistics', props<{ payload: { statistics: Statistics } }>());
export const FETCH_AUTHOR_STATISTICS_FALIURE = createAction('[RATINGS] Fetch author statistics faliure', props<{ payload: { error: any } }>());
export const AUTHOR_STATISTICS_NOT_AVALIABLE = createAction('[RATINGS] Author statistics not avaliable');
