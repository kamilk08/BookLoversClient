import { createReducer, on, Action } from '@ngrx/store';
import * as authorStatisticsAction from './author-statistics.actions';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { Statistics } from '../../../../api/ratings/statistics/models/statistics';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface AuthorStatistics {
  entities: { [authorId: number]: Statistics }
  ids: number[]
  processing: boolean
  error: ApiError
}

const initialState: AuthorStatistics = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(authorStatisticsAction.SELECT_AUTHOR_STATISTICS, state => ({ ...state, processing: true })),
  on(authorStatisticsAction.FETCH_AUTHOR_STATISTICS, (state, action) => {
    const newState = fetchSingle((statistics: Statistics) => statistics.objectId, state, action.payload.statistics);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false };
  }),
  on(authorStatisticsAction.FETCH_AUTHOR_STATISTICS_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function authorStatisticsReducer(state: AuthorStatistics, action: Action) {
  return reducer(state, action);
}
