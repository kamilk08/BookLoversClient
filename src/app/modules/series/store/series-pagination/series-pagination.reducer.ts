import { createReducer, on, Action } from '@ngrx/store';
import { Series } from '../../../api/series/models/series.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ApiError } from 'src/app/modules/api/api-error.model';

import * as fromActions from './series-pagination.actions';
export interface SeriesPaginationState {
  entities: Series[],
  processing: boolean,
  pageResult: PageResult,
  error: ApiError
}

const initialState: SeriesPaginationState = {
  entities: [],
  processing: false,
  pageResult: undefined,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_SERIES_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_SERIES_BY_AUTHOR, state => ({ ...state, processing: true })),
  on(fromActions.SET_SERIES_PAGE, (state, action) => ({ ...state, entities: action.payload.series, pageResult: action.payload.pageResult })),
  on(fromActions.SERIES_PAGE_SELECTED, (state) => ({ ...state, processing: false })),
  on(fromActions.STOP_PROCESSING_SERIES_PAGE, (state) => ({ ...state, processing: false }))
);

export function seriesPaginationReducer(state: SeriesPaginationState, action: Action) {
  return reducer(state, action);
}
