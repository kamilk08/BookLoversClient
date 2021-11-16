import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import * as seriesStatisticsAction from './series-statistics.actions';
import { on, createReducer, Action } from '@ngrx/store';
import { Statistics } from 'src/app/modules/api/ratings/statistics/models/statistics';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SeriesStatistics {
  entities: { [seriesId: number]: Statistics }
  ids: number[]
  processing: boolean
  error: ApiError
}

const initialState: SeriesStatistics = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(seriesStatisticsAction.SELECT_SERIES_STATISTICS, state => ({ ...state, processing: true })),
  on(seriesStatisticsAction.SELECT_MULTIPLE_SERIES_STATISTICS, state => ({ ...state, processing: true })),
  on(seriesStatisticsAction.FETCH_SERIES_STATISTICS, (state, action) => {
    const newState = fetchSingle((s: Statistics) => s.objectId, state, action.payload.statistics);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(seriesStatisticsAction.FETCH_MULTIPLE_SERIES_STATISTICS, (state, action) => {
    const newState = fetchMany((s: Statistics) => s.objectId, state, action.payload.statistics);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(seriesStatisticsAction.FETCH_SERIES_STATISTICS_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function seriesStatisticsReducer(state: SeriesStatistics, action: Action) {
  return reducer(state, action);
}
