import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QuoteAdapter } from './quote.adapter';
import { UUID } from 'angular2-uuid';
import * as fromUrls from './quotes.urls';
import { GET_QUOTE } from './quotes.urls';
import { AddQuoteResponse } from './responses/add-quote.response';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { AddQuote } from './models/add-quote.model';
import { OrderedQuery } from '../../shared/common/query';

@Injectable()
export class QuotesApi {

  constructor(private http: HttpClient, private adapter: QuoteAdapter) { }

  getQuote(id: number) {
    return this.http.get(GET_QUOTE(id), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as AddQuoteResponse));
  }

  getBookQuotes(bookId: number, query: OrderedQuery) {
    return this.http.get(fromUrls.GET_BOOK_QUOTES(bookId, query.page, query.count, query.sortType.value, query.descending),
      { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => {
        return {
          pageResult: {
            items: this.mapQuotes(response),
            page: response.page,
            totalItems: response.totalItems,
            pagesCount: response.pagesCount
          }
        }
      }));
  }

  getAuthorQuotes(authorId: number, query: OrderedQuery) {
    return this.http.get(fromUrls.GET_AUTHOR_QUOTES(authorId, query.page, query.count, query.sortType.value, query.descending), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => {
        return {
          pageResult: {
            items: this.mapQuotes(response),
            page: response.page,
            totalItems: response.totalItems,
            pagesCount: response.pagesCount
          }
        }
      }))
  };

  getReaderQuotes(readerId: number, query: OrderedQuery) {
    return this.http.get(fromUrls.GET_READER_QUOTES(readerId, query.page, query.count, query.sortType.value, query.descending))
      .pipe(
        map((response: any) => {
          return {
            pageResult: {
              items: this.mapQuotes(response),
              page: response.page,
              totalItems: response.totalItems,
              pagesCount: response.pagesCount
            }
          }
        })
      )
  }

  addBookQuote(model: AddQuote) {
    return this.http.post(fromUrls.ADD_BOOK_QUOTE, model,
      { headers: DEFAULT_HEADERS() });
  }

  addAuthorQuote(model: AddQuote) {
    return this.http.post(fromUrls.ADD_AUTHOR_QUOTE, model,
      { headers: DEFAULT_HEADERS() });
  }

  likeQuote(quoteGuid: UUID) {
    return this.http.post(fromUrls.LIKE_QUOTE(quoteGuid), null,
      { headers: DEFAULT_HEADERS() });
  }

  unLikeQuote(quoteGuid: UUID) {
    return this.http.delete(fromUrls.UNLIKE_QUOTE(quoteGuid),
      { headers: DEFAULT_HEADERS() });
  }

  private mapQuotes = (response: any) => Array.from(response.items).map(i => this.adapter.adapt(i));
}
