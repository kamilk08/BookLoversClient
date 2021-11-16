import { createAction, props } from '@ngrx/store';
import { ApiError } from '../../api/api-error.model';
import { BrowseCriteria } from '../../api/browse/models/browse-criteria.model';
import { PageResult } from '../../shared/common/page-result';

export const START_BROWSING = createAction('[BROWSE] Start Browsing', props<{ payload: { model: BrowseCriteria } }>());
export const FETCH_BROWSING_RESULTS = createAction('[BROWSE] Fetch browsing results', props<{ payload: { pageResult: PageResult } }>());
export const FINISH_BROWSING = createAction('[BROWSE] Finish browsing');
export const FETCH_BROWSING_RESULTS_FALIURE = createAction('[BROWSE] Browsing faliure', props<{ payload: { model: ApiError } }>());
