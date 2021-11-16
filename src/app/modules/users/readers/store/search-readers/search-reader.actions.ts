import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SEARCH_READERS = createAction('[READERS] Search readers', props<{ payload: { query: Query } }>());
export const SET_READERS_PAGE = createAction('[READERS] Set readers page', props<{ payload: { pageResult: PageResult } }>());
export const SEARCH_READERS_FALIURE = createAction('[READERS] Search readers faliure', props<{ payload: { error: ApiError } }>());
