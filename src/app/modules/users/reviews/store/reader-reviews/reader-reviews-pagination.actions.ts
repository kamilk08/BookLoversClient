import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { OrderedQuery } from 'src/app/modules/shared/common/query';

export const SELECT_READER_REVIEWS_PAGE = createAction('[REVIEWS] Select reader reviews page', props<{ payload: { readerId: number, query: OrderedQuery } }>());
export const SET_READER_REVIEWS_PAGE = createAction('[REVIEWS] Set reader reviews page', props<{ payload: { readerId: number, pageResult: PageResult } }>());
export const REORDER_READER_REVIEWS_PAGE = createAction('[REVIEWS] Reorder reader paginated reviews', props<{ payload: { readerId: number, query: OrderedQuery } }>());
export const REVIEWS_PAGE_FALIURE = createAction('[REVIEWS] Reader reviews page faliure', props<{ payload: { error: ApiError } }>());
export const READER_REVIEWS_PAGE_SELECTED = createAction('[REVIEWS] Reader reviews page selected');
