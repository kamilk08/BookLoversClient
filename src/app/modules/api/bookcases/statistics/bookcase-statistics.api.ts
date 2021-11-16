import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GET_BOOKCASES_WITH_BOOK, GET_SHELVES_WITH_BOOK } from './bookcase-statistics.urls';
import { Observable } from 'rxjs';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { Query } from 'src/app/modules/shared/common/query';

@Injectable()
export class BookcaseStatisticsApi {

  constructor(private http: HttpClient) { }

  getShelvesWithBook(bookId: number, query: Query) {
    return this.http.get(GET_SHELVES_WITH_BOOK(bookId, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => {
        return {
          items: response.items,
          page: response.page,
          totalItems: response.totalItems,
          pagesCount: response.pagesCount,
        };
      }));
  }

  getBookcasesWithBook(bookId: number): Observable<number[]> {
    return this.http.get(GET_BOOKCASES_WITH_BOOK(bookId), { headers: DEFAULT_HEADERS() })
      .pipe(
        map(response => response as number[]));
  }


}
