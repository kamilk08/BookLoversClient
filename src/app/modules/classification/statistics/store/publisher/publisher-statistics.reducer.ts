import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Statistics } from 'src/app/modules/api/ratings/statistics/models/statistics';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import * as fromActions from './publisher-statistics.actions';

export interface PublisherStatistics {
  entities: { [id: number]: Statistics },
  ids: number[],
  processing: boolean,
  error: ApiError
}

const initialState: PublisherStatistics = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PUBLISHER_STATISTICS, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_PUBLISHER_STATISTICS, (state, action) => {
    if (action.payload.statistics == null)
      return { ...state };

    const newState = fetchSingle((s: Statistics) => s.objectId, state, action.payload.statistics);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_PUBLISHER_STATISTICS_FALIURE, (state, action) => ({ ...state, error: action.payload.error }))
);

export function publisherStatisticsReducer(state: PublisherStatistics, action: Action) {
  return reducer(state, action);
}
