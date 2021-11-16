import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeriesAdapter } from './series.adapter';
import { ADD_SERIES, GET_SERIES_BY_ID, GET_MULTIPLE_SERIES, GET_SERIES_BY_BOOK, GET_SERIES_BY_AUTHOR, GET_SERIES_BY_NAME, FIND_SERIES, GET_SERIES_BOOKS } from './series.urls';
import { AddSeriesResponse } from './responses/add-series.response';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { AddSeries } from './models/add-series.model';
import { Series } from './models/series.model';
import { Query } from '../../shared/common/query';
import { SeriesBooksPageQuery } from '../../series/index/models/series-books-page.query';
import { PageResult } from '../../shared/common/page-result';

@Injectable()
export class SeriesApi {

  constructor(private http: HttpClient, private adapter: SeriesAdapter) { }

  addSeries(model: AddSeries) {
    return this.http.post(ADD_SERIES, model, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as AddSeriesResponse));
  }

  getSeriesById(id: number): Observable<Series> {
    return this.http.get(GET_SERIES_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getMultipleSeries(ids: number[]): Observable<Series[]> {
    let params = new HttpParams()
    ids.forEach(id => params = params.append('ids', JSON.stringify(id)));

    return this.http.get(GET_MULTIPLE_SERIES, { params: params })
      .pipe(map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))));
  }

  getSeriesByBook(bookId: number): Observable<Series> {
    return this.http.get(GET_SERIES_BY_BOOK(bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getSeriesByAuthor(authorId: number, query: Query) {
    return this.http.get(GET_SERIES_BY_AUTHOR(authorId, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => {
        const series = Array.from(response.items).map(item => this.adapter.adapt(item));
        return {
          series: series,
          pageResult: {
            items: series,
            page: response.page,
            totalItems: response.totalItems,
            pagesCount: response.pagesCount
          }
        }
      }))
  }

  getSeriesBooks(query: SeriesBooksPageQuery) {
    let f = GET_SERIES_BOOKS(query.seriesId, query.page, query.count, query.descending, query.value, query.sortType.value);
    return this.http.get(GET_SERIES_BOOKS(query.seriesId, query.page, query.count, query.descending, query.value, query.sortType.value), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as PageResult))
  }

  getSeriesByName(name: string): Observable<Series> {
    return this.http.get(GET_SERIES_BY_NAME(name), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  findSeries(query: Query) {
    return this.http.get(FIND_SERIES(query.value, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map(this.mapPaginatedBookSeries))
  }

  private mapPaginatedBookSeries = (response: any) => Array.from(response.items).map(i => this.adapter.adapt(i))
}
