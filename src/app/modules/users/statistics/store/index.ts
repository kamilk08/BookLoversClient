
import * as fromReaderStatistics from './reader-statistics/reader-statistics.reducer';
import * as fromReaderRatingsStatistics from './ratings-statistics/ratings-statistics.reducer';

import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';

export interface ReaderStatisticsModuleState {
  statistics: fromReaderStatistics.ReaderStatisticsState,
  ratingsStatistics: fromReaderRatingsStatistics.ReaderRatingsStatisticsState
};

const reducerMap: ActionReducerMap<ReaderStatisticsModuleState> = {
  statistics: fromReaderStatistics.readerStatisticsReducer,
  ratingsStatistics: fromReaderRatingsStatistics.readerRatingsStatisticsReducer
};

const reducer = combineReducers(reducerMap);

export function readerModuleStatisticsReducer(state: ReaderStatisticsModuleState, action: Action) {
  return reducer(state, action);
}

export const readerStatisticsModuleSelector = createFeatureSelector('reader-statistics');
