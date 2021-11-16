import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import { Series } from '../../../api/series/models/series.model';

export const SELECT_SERIES_BY_AUTHOR = createAction('[SERIES] Select series by author', props<{ payload: { authorId: number, query: Query } }>());
export const SELECT_SERIES_PAGE = createAction('[SERIES] Select series page', props<{ payload: { query: Query } }>());
export const SET_SERIES_PAGE = createAction('[SERIES] Set series page', props<{ payload: { series: Series[], pageResult: PageResult } }>());
export const SERIES_PAGE_SELECTED = createAction('[SERIES] Series page selected');
export const STOP_PROCESSING_SERIES_PAGE = createAction('[SERIES] Stop processing series page');

export const SET_SERIES_PAGE_FALIURE = createAction('[SERIES] Set series page faliure', props<{ payload: { error: ApiError } }>())
