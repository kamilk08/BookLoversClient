import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GET_AUTHOR_STATISTICS, GET_SERIES_STATISTICS, GET_MULTIPLE_SERIES_STATISTICS, GET_PUBLISHER_STATISTICS } from './statistics-urls';
import { map } from 'rxjs/operators';
import { Statistics } from './models/statistics';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class StatisticsApi {

  constructor(private http: HttpClient) { }

  getAuthorStatistics(authorId: number) {
    return this.http.get(GET_AUTHOR_STATISTICS(authorId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as Statistics));
  }

  getSeriesStatistics(seriesId: number) {
    return this.http.get(GET_SERIES_STATISTICS(seriesId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as Statistics));
  }

  getPublisherStatistics(publisherId: number) {
    return this.http.get(GET_PUBLISHER_STATISTICS(publisherId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as Statistics));
  }

  getMultipleSeriesStatistics(seriesIds: number[]) {
    let params = new HttpParams();
    seriesIds.forEach(id => params = params.append('seriesIds', JSON.stringify(id)));

    return this.http.get(GET_MULTIPLE_SERIES_STATISTICS, { headers: DEFAULT_HEADERS(), params: params })
      .pipe(map(response => response as Statistics[]))
  }
}
