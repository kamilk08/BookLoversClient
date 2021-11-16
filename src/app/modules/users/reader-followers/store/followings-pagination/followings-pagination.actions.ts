import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_READER_FOLLOWINGS_PAGE = createAction('[READER_FOLLOWERS] Select reader followings page', props<{ payload: { readerId: number, query: Query } }>());
export const SET_READER_FOLLOWINGS_PAGE = createAction('[READER_FOLLOWERS] Set reader followings page result', props<{ payload: { readerId: number, pageResult: PageResult } }>());
export const SET_READER_FOLLOWINGS_PAGE_FALIURE = createAction('[READER_FOLLOWERS] Fetch reader followings faliure', props<{ payload: { error: ApiError } }>());
