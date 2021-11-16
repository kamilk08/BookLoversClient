import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_ACTIVITIES_PAGE = createAction('[TIMELINE] Select timeline activities', props<{ payload: { timelineId: number, query: Query, hidden: boolean } }>());
export const SET_ACTIVITIES_PAGE = createAction('[TIMELINE] Fetch timeline activities', props<{ payload: { pageResult: PageResult } }>());
export const SET_ACTIVITIES_PAGE_FALIURE = createAction('[TIMELINE] Fetch timeline activites faliure', props<{ payload: { error: ApiError } }>());
export const END_SELECTING = createAction('[TIMELINE] End selecting activities');
