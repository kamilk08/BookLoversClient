import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { ReaderRatings } from './models/reader-ratings-statistics.model';
import { ReaderStatistics } from './models/reader-statistics.model';
import { GET_READER_RATINGS_STATISTICS, GET_READER_STATISTICS } from './statistics.url';

@Injectable()
export class ReaderStatisticsApi {

  constructor(private http: HttpClient) {

  }

  getReaderStatistics(readerId: number) {
    return this.http.get(GET_READER_STATISTICS(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(
        map(response => response as ReaderStatistics));
  };

  getReaderRatingsStatistics(readerId: number) {
    return this.http.get(GET_READER_RATINGS_STATISTICS(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as ReaderRatings))
  }

}
