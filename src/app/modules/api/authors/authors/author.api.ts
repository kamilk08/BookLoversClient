import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthorAdapter } from './author.adapter';
import * as fromUrls from './author.urls';
import { UUID } from 'angular2-uuid';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { AuthorBooksPageQuery } from 'src/app/modules/authors/models/author-books-page.model';

@Injectable()
export class AuthorApi {

  constructor(private http: HttpClient,
    private adapter: AuthorAdapter) { }

  getAuthorById(id: number) {

    return this.http.get(fromUrls.GET_AUTHOR_BY_ID(id),
      { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getAuthorByGuid(guid: UUID) {

    return this.http.get(fromUrls.GET_AUTHOR_BY_GUID(guid),
      { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getMultipleAuthorsById(ids: number[]) {

    let params = new HttpParams();
    ids.forEach(id => params = params.append('ids', JSON.stringify(id)));

    return this.http.get(fromUrls.GET_MULTIPLE_AUTHORS, { params: params })
      .pipe(
        map((response: any) => Array.from(response).map(item => this.adapter.adapt(item)))
      );
  };

  getMultipleAuthorsByGuid(guides: UUID[]) {

    let params = new HttpParams();
    guides.forEach(guid => params = params.append('guides', guid.toString()));

    return this.http.get(fromUrls.GET_MULTIPLE_AUTHORS_BY_GUID, { params: params })
      .pipe(
        map((response: any) => Array.from(response).map(item => this.adapter.adapt(item)))
      )
  }

  getAuthorBooks(query: AuthorBooksPageQuery) {

    const url = fromUrls.GET_AUTHOR_BOOKS(query.authorId, query.page, query.count, query.descending, query.sortType.value, query.value);

    return this.http.get(url, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as PageResult))

  }

  findAuthor(fullName: string, page: number, count: number) {
    return this.http.get(fromUrls.FIND_AUTHOR(fullName, page, count), { headers: DEFAULT_HEADERS() })
      .pipe(map(this.mapPaginatedAuthors));
  }

  private mapPaginatedAuthors = (response: any) => Array.from(response.items).map(i => this.adapter.adapt(i));
}

