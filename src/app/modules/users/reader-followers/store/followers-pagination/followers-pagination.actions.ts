import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_READER_FOLLOWERS_PAGE = createAction('[READER_FOLLOWERS] Select reader followers page', props<{ payload: { readerId: number, query: Query } }>());
export const SET_READER_FOLLOWER_PAGE = createAction('[READER_FOLLOWERS] Set reader followers page', props<{ payload: { readerId: number, pageResult: PageResult } }>());
export const SET_READER_FOLLOWERS_PAGE_FALIURE = createAction('[READER_FOLLOWERS] Set reader followers page faliure', props<{ payload: { error: ApiError } }>());


