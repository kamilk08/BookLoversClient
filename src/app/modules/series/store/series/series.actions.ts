import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Series } from '../../../api/series/models/series.model';
import { SeriesNotFound } from '../../index/models/series-not-found';

export const SELECT_SERIES = createAction('[SERIES] Select series', props<{ payload: { id: number } }>());
export const SELECT_MULTIPLE_SERIES = createAction('[SERIES] Select multiple series', props<{ payload: { ids: number[] } }>());
export const SELECT_SERIES_BY_BOOK = createAction('[SERIES] Select series by book id', props<{ payload: { bookId: number } }>());

export const FETCH_SERIES = createAction('[SERIES] Fetch series', props<{ payload: { series: Series } }>());
export const FETCH_MULTIPLE_SERIES = createAction('[SERIES] Fetch multiple series', props<{ payload: { series: Series[] } }>());
export const FETCH_SERIES_FALIURE = createAction('[SERIES] Fetch series faliure', props<{ payload: { model: ApiError } }>());

export const SERIES_NOT_FOUND = createAction('[SEREIS] Series not found', props<{ payload: { model: SeriesNotFound } }>());
