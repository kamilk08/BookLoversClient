import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { ReaderRatings } from '../../../../api/statistics/models/reader-ratings-statistics.model';
import * as fromActions from './ratings-statistics.actions';

export interface ReaderRatingsStatisticsState {
  entities: { [readerId: number]: ReaderRatings },
  ids: number[],
  processing: boolean,
  error: ApiError
}

const initialState: ReaderRatingsStatisticsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_READER_RATINGS_STATISTICS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_READER_RATINGS_STATISTICS, (state, action) => {
    const newState = fetchSingle((entity: ReaderRatings) => entity.readerId, state, action.payload.statistics);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_READER_RATINGS_STATISTICS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  })
);

export function readerRatingsStatisticsReducer(state: ReaderRatingsStatisticsState, action: Action) {
  return reducer(state, action);
}
