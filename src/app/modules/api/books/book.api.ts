import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookAdapter } from './book.adapter';
import * as fromBookUrls from './book.urls';
import { UUID } from 'angular2-uuid';
import { BookResponse } from './responses/book.response';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { Book } from './models';
import { Query } from '../../shared/common/query';
import { PageResult } from '../../shared/common/page-result';



@Injectable()
export class BookApi {

  constructor(private http: HttpClient, private adapter: BookAdapter) { }

  getBookById(id: number): Observable<Book> {
    return this.http.get(fromBookUrls.GET_BOOK_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: BookResponse) => this.adapter.adapt(response)))
  }

  getBookByGuid(guid: UUID): Observable<Book> {
    return this.http.get(fromBookUrls.GET_BOOK_BY_GUID(guid), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getBooksByIds(ids: number[]) {
    let params = new HttpParams();
    ids.forEach(id => params = params.append('bookIds', JSON.stringify(id)));

    if (ids.length === 0) params = params.append('bookIds', JSON.stringify(-1));

    return this.http.get(fromBookUrls.GET_MULTIPLE_BOOKS_BY_ID, { params: params })
      .pipe(map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))))
  }

  getBooksByGuids(guides: UUID[]) {
    let params = new HttpParams();
    guides.forEach(guid => params = params.append('guides', guid.toString()));


    return this.http.get(fromBookUrls.GET_MULTIPLE_BOOKS_BY_GUID, { params: params })
      .pipe(map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))))
  }

  searchBookByTitle(query: Query) {

    return this.http.get(fromBookUrls.SEARCH_BOOK(query.value, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => this.mapBooks(response)));
  }

  selectBooksPage(query: Query) {
    return this.http.get(fromBookUrls.SELECT_BOOKS_PAGE(query))
      .pipe(map(response => {
        return {
          pageResult: response as PageResult,
          books: this.mapBooks(response)
        }
      }));
  }

  private mapBooks = (response: any) => Array.from(response.items).map(item => this.adapter.adapt(item));
}
