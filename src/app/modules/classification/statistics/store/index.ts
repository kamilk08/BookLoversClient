import * as fromSeriesStatistics from './series/series-statistics.reducer';
import * as fromAuthorsStatistics from './authors/author-statistics.reducer';
import * as fromPublisherStatistics from './publisher/publisher-statistics.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface StatisticsState {
    seriesStatistics: fromSeriesStatistics.SeriesStatistics
    authorsStatistics: fromAuthorsStatistics.AuthorStatistics
    publisherStatistics: fromPublisherStatistics.PublisherStatistics
}


const reducerMap: ActionReducerMap<StatisticsState> = {
    seriesStatistics: fromSeriesStatistics.seriesStatisticsReducer,
    authorsStatistics: fromAuthorsStatistics.authorStatisticsReducer,
    publisherStatistics: fromPublisherStatistics.publisherStatisticsReducer
};

const reducer = combineReducers(reducerMap);

export function statisticsStateReducer(state: StatisticsState, action: Action) {
    return reducer(state, action);
}

export const statisticsState = createFeatureSelector('ratings-statistics');
