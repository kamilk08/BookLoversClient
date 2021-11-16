import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';
import { SELECT_AUTHOR_STATISTICS } from './authors/author-statistics.actions';
import { SELECT_MULTIPLE_SERIES_STATISTICS, SELECT_SERIES_STATISTICS } from './series/series-statistics.actions';
import { SELECT_PUBLISHER_STATISTICS } from './publisher/publisher-statistics.actions';

@Injectable()
export class StatisticsFacade {

  public readonly authorStatistics$ = (authorId: number) => this.store.select(fromSelectors.authorStatistics(authorId));
  public readonly authorAverage$ = (authorId: number) => this.store.select(fromSelectors.authorsAverage(authorId));

  public readonly seriesStatistics$ = (seriesId: number) => this.store.select(fromSelectors.seriesStatistics(seriesId));
  public readonly publisherStatistics$ = (publisherId: number) => this.store.select(fromSelectors.publisherStatistics(publisherId));

  public readonly seriesAverage$ = (seriesId: number) => this.store.select(fromSelectors.seriesAverage(seriesId));
  public readonly seriesRatingsCount$ = (seriesId: number) => this.store.select(fromSelectors.seriesRatingsCount(seriesId));
  public readonly publisherAverage$ = (publisherId: number) => this.store.select(fromSelectors.publisherAverage(publisherId));

  constructor(private store: Store<fromModule.StatisticsState>) { }

  selectAuthorStatistics(authorId: number) {
    this.store.dispatch(SELECT_AUTHOR_STATISTICS({ payload: { authorId } }));
  }

  selectSeriesStatistics(seriesId: number) {
    this.store.dispatch(SELECT_SERIES_STATISTICS({ payload: { id: seriesId } }));
  }

  selectMultipleSeriesStatistics(ids: number[]) {
    this.store.dispatch(SELECT_MULTIPLE_SERIES_STATISTICS({ payload: { ids } }))
  }

  selectPublisherStatistics(publisherId: number) {
    this.store.dispatch(SELECT_PUBLISHER_STATISTICS({ payload: { publisherId } }))
  }
}
