import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { Statistics } from '../../../../api/ratings/statistics/models/statistics';

export const SELECT_PUBLISHER_STATISTICS = createAction('[RATINGS] Select publisher statistics', props<{ payload: { publisherId: number } }>());
export const FETCH_PUBLISHER_STATISTICS = createAction('[RATINGS] Fetch publisher statistics', props<{ payload: { statistics: Statistics } }>());
export const FETCH_PUBLISHER_STATISTICS_FALIURE = createAction('[RATINGS] Fetch publisher statistics faliure', props<{ payload: { error: ApiError } }>());
