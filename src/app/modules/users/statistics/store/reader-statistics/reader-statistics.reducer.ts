import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReaderStatistics } from 'src/app/modules/api/statistics/models/reader-statistics.model';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import * as fromActions from './reader-statistics.actions';

export interface ReaderStatisticsState {
  entities: { [readerId: number]: ReaderStatistics },
  ids: number[],
  processing: boolean,
  error: ApiError
};

const initialState: ReaderStatisticsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_READER_STATISTICS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_READER_STATISTICS, (state, action) => {
    const newState = fetchSingle((entity: ReaderStatistics) => entity.readerId, state, action.payload.statistics);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_READER_STATISTICS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function readerStatisticsReducer(state: ReaderStatisticsState, action: Action) {
  return reducer(state, action);
}
