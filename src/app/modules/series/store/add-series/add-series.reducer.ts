import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Series } from '../../../api/series/models/series.model';
import * as fromActions from './add-series.actions';

export interface AddSeriesState {
  series: Series
  processing: boolean
  error: ApiError
}

const initialState: AddSeriesState = {
  series: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_SERIES, (state, action) => {
    return { ...state, series: action.payload.series, processing: true }
  }),
  on(fromActions.ADD_SERIES_SUCCESS, (state, action) => {
    const series = state.series;
    series.setSeriesId(action.payload.seriesId);

    return { ...state, series: series, processing: false };
  }),
  on(fromActions.ADD_SERIES_FALIURE, (state, action) => {

    return { ...state, error: action.payload.model, processing: false }
  })
);

export function addSeriesReducer(state: AddSeriesState, action: Action) {
  return reducer(state, action);
}
