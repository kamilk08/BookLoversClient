import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_BOOKS_PAGE = createAction('[BOOKS] Select books page', props<{ payload: { query: Query } }>());
export const SET_BOOKS_PAGE = createAction('[BOOKS] Set books page', props<{ payload: { pageResult: PageResult, delay?: number } }>())
export const SET_BOOKS_PAGE_SUCCESS = createAction('[BOOKS] Set books page success');
export const SET_BOOKS_PAGE_FALIURE = createAction('[BOOKS] Set books page faliure', props<{ payload: { model: ApiError } }>());
