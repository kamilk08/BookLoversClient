import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromAddSeries from './add-series/add-series.reducer';
import * as fromSeries from './series/series.reducer';
import * as fromSeriesPagination from './series-pagination/series-pagination.reducer';
import * as fromSearchSeries from './search-series/search-series.reducer';
import * as fromPageState from './page/series-web-page.reducer';
import * as fromSeriesBooksPagination from './series-books/series-books.reducer';

export interface SeriesModuleState {
  addSeries: fromAddSeries.AddSeriesState,
  series: fromSeries.SeriesState
  searchSeries: fromSearchSeries.SearchSeriesState,
  seriesPagination: fromSeriesPagination.SeriesPaginationState,
  booksPagination: fromSeriesBooksPagination.SeriesBooksState,
  pageState: fromPageState.SeriesWebPageState
}

const reducersMap: ActionReducerMap<SeriesModuleState> = {
  addSeries: fromAddSeries.addSeriesReducer,
  series: fromSeries.seriesReducer,
  searchSeries: fromSearchSeries.searchSeriesReducer,
  seriesPagination: fromSeriesPagination.seriesPaginationReducer,
  booksPagination: fromSeriesBooksPagination.seriesBooksStateReducer,
  pageState: fromPageState.seriesWebPageReducer
};

const reducer = combineReducers(reducersMap);

export function seriesStateReducer(state: SeriesModuleState, action: Action) {
  return reducer(state, action);
}

export const seriesState = createFeatureSelector('series');
