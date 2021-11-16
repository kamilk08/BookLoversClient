import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_SERIES_BY_BOOK, SELECT_MULTIPLE_SERIES, SELECT_SERIES } from './series.actions';
import { Query } from 'src/app/modules/shared/common/query';
import { START_FILTERING_SERIES } from '../search-series/search-series.actions';
import { isBookSeriesFiltered, searchedSeries } from '../search-series/search-series.selectors';
import { ADD_SERIES } from '../add-series/add-series.actions';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { SELECT_SERIES_BOOKS } from '../series-books/series-books.actions';
import { SeriesBooksPageQuery } from '../../index/models/series-books-page.query';

import * as fromSelectors from '../module.selectors';
import * as fromModule from '../index';
@Injectable()
export class SeriesFacade {

  public readonly error$ = this.store.select(fromSelectors.fetchError);

  public readonly seriesById$ = (seriesId: number) => this.store.select(fromSelectors.seriesById(seriesId));
  public readonly seriesByBookId$ = (bookId: number) => this.store.select(fromSelectors.seriesByBookId(bookId));
  public readonly multipleSeries$ = (seriesIds: number[]) => this.store.select(fromSelectors.multipleSeries(seriesIds));

  public readonly seriesTitle$ = (seriesId: number) => this.store.select(fromSelectors.seriesTitle(seriesId));
  public readonly otherBooksInSeries$ = (bookId: number) => this.store.select(fromSelectors.otherBooksInSeries(bookId));

  public readonly seriesBooksCount$ = (seriesId: number) => this.store.select(fromSelectors.seriesBooksCount(seriesId))

  public readonly searchedBookSeries$ = this.store.select(searchedSeries);
  public readonly isBookSeriesFiltered$ = this.store.select(isBookSeriesFiltered);

  public readonly isProcessingSeries$ = this.store.select(fromSelectors.isProcessingSeries);

  public readonly addedSeries$ = this.store.select(fromSelectors.addedSeries);

  public readonly seriesBooksPageResult$ = this.store.select(fromSelectors.seriesBooksPageResult)
  public readonly seriesBooksIds$ = this.store.select(fromSelectors.seriesBooksIds);
  public readonly processingBooks$ = this.store.select(fromSelectors.processingSeriesBooks)

  constructor(private store: Store<fromModule.SeriesModuleState>) { }

  selectSingleById(id: number) {
    this.store.dispatch(SELECT_SERIES({ payload: { id } }))
  }

  selectMultiple(ids: number[]) {
    this.store.dispatch(SELECT_MULTIPLE_SERIES({ payload: { ids } }))
  }

  selectSeriesByBook(bookId: number) {
    this.store.dispatch(SELECT_SERIES_BY_BOOK({ payload: { bookId } }));
  }

  selectSeriesBooks(query: SeriesBooksPageQuery) {
    this.store.dispatch(SELECT_SERIES_BOOKS({ payload: { query } }));
  }

  findSeries(query: Query) {
    this.store.dispatch(START_FILTERING_SERIES({ payload: { query } }));
  }

  addSeries(series: Series) {
    this.store.dispatch(ADD_SERIES({ payload: { series: series } }))
  }
}
