import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublisherAdapter } from './publisher.adapter';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromUrls from './publisher.urls';
import { AddPublisherResponse } from './responses/add-publisher.response';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { Publisher } from './models/publisher.model';
import { AddPublisher } from './models/add-publisher.model';
import { Query } from '../../shared/common/query';
import { PageResult } from '../../shared/common/page-result';
import { PublisherBooksPageQuery } from '../../publisher/models/publisher-books-page.query';

@Injectable()
export class PublisherApi {

  constructor(private http: HttpClient, private adapter: PublisherAdapter) { }

  getPublisherById(id: number): Observable<Publisher> {
    return this.http.get(fromUrls.GET_PUBLISHER_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getPublisherByName(name: string): Observable<Publisher> {
    return this.http.get(fromUrls.GET_PUBLISHER_BY_NAME(name), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getPublisherByBookId(bookId: number): Observable<Publisher> {
    return this.http.get(fromUrls.GET_PUBLISHER_BY_BOOK_ID(bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getPublisherBooks(query: PublisherBooksPageQuery): Observable<PageResult> {

    return this.http.get(fromUrls.GET_PUBLISHER_COLLECTION(query.publisherId, query.value, query.page,
      query.count, query.descending, query.sortType.value), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as PageResult));
  }

  addPublisher(model: AddPublisher) {
    return this.http.post(fromUrls.CREATE_PUBLISHER, model, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as AddPublisherResponse))
  }

  findPublisher(query: Query) {
    return this.http.get(fromUrls.FIND_PUBLISHER(query.value, query.page, query.count))
      .pipe(map(this.mapPublishers));
  }


  private mapPublishers = (response: any) => Array.from(response.items).map(i => this.adapter.adapt(i));
}
