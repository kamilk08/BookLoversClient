import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PageResult } from '../../shared/common/page-result';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { BookAdapter } from '../books/book.adapter';
import { FILTER_BOOKS } from './browse.urls';

@Injectable()
export class BrowseApi {

  constructor(private http: HttpClient, private bookAdapater: BookAdapter) {

  }

  searchBooks(criteria: any) {
    let params = new HttpParams();
    params = params.append('searchCriteria', JSON.stringify(criteria));

    return this.http.get(FILTER_BOOKS, { headers: DEFAULT_HEADERS(), params: params })
      .pipe(
        map((response: any) => {
          return {
            pageResult: response as PageResult,
            books: Array.from(response.items).map(b => this.bookAdapater.adapt(b))
          }
        })
      );
  }

}
