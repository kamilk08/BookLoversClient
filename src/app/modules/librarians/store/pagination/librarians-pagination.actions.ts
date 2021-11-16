import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from '../../../shared/common/page-result';

export const SELECT_LIBRARIANS_PAGE = createAction('[LIBRARIANS_PAGINATION] Select librarians page', props<{ payload: { ids: number[], page: number, count: number } }>());
export const FETCH_LIBRARIANS_PAGE = createAction('[LIBRARIANS_PAGINATION] Fetch librarians page', props<{ payload: { pageResult: PageResult } }>());
export const SELECT_LIBRARIANS_PAGE_ERROR = createAction('[LIBRARIANS_PAGINATION] Select librarians page error', props<{ payload: { error: ApiError } }>());
