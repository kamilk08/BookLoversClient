import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { OrderedQuery } from 'src/app/modules/shared/common/query';

export const SELECT_BOOK_REVIEWS_PAGE = createAction('[REVIEWS] Select book reviews page', props<{ payload: { bookId: number, query: OrderedQuery } }>());
export const SET_BOOK_REVIEWS_PAGE = createAction('[REVIEWS] Set book reviews page', props<{ payload: { pageResult: PageResult } }>());
export const REORDER_REVIEWS_PAGE = createAction('[REVIEWS] Reorder book paginated reviews', props<{ payload: { query: OrderedQuery } }>());
export const REVIEWS_PAGE_FALIURE = createAction('[REVIEWS] Book reviews page faliure', props<{ payload: { error: ApiError } }>());
