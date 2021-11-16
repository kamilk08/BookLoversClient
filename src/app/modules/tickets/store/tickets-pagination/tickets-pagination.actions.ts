import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_USER_TICKETS_PAGE = createAction('[TICKETS] Select user tickets page', props<{ payload: { query: Query, solved: boolean } }>());
export const SELECT_MANAGEABLE_TICKETS_PAGE = createAction('[TICKETS] Select manageable tickets page', props<{ payload: { query: Query, solved: boolean } }>());
export const FETCH_TICKETS_PAGE = createAction('[TICKETS] Fetch user tickets page', props<{ payload: { pageResult: PageResult } }>());
export const TICKETS_PAGE_ERROR = createAction('[TICKETS] Select user tickets page error', props<{ payload: { error: ApiError } }>());

