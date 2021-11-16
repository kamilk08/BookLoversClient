import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Query } from 'src/app/modules/shared/common/query';
import { SELECT_SERIES_BY_AUTHOR, SELECT_SERIES_PAGE, STOP_PROCESSING_SERIES_PAGE } from './series-pagination.actions';
import { isProcessingSeriesPage, seriesPageResult, paginatedSeries } from './series-pagination.selectors';

import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';


@Injectable()
export class SeriesPaginationFacade {

  public readonly paginatedSeries$ = this.store.select(paginatedSeries);
  public readonly pageResult$ = this.store.select(seriesPageResult);
  public readonly isProcessingPage$ = this.store.select(isProcessingSeriesPage);

  public readonly currentPage$ = this.store.select(fromSelectors.currentSeriesPage);
  public readonly totalItems$ = this.store.select(fromSelectors.totalItems);

  constructor(private store: Store<fromModule.SeriesModuleState>) { }

  selectSeriesPage(query: Query) {
    this.store.dispatch(SELECT_SERIES_PAGE({ payload: { query } }))
  }

  selectSeriesByAuthor(authorId: number, query: Query) {
    this.store.dispatch(SELECT_SERIES_BY_AUTHOR({ payload: { authorId, query } }));
  }

  stopProcessing() {
    this.store.dispatch(STOP_PROCESSING_SERIES_PAGE());
  }
}
