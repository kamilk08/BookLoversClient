import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RatingAdapter } from './rating.adapter';
import { Query } from 'src/app/modules/shared/common/query';
import { GET_BOOK_GROUPED_RATINGS, GET_MULTIPLE_RATINGS, GET_USER_BOOK_RATING, GET_USER_RATINGS } from './ratings.urls';
import { RatingResponse } from './responses/rating.response';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { PageResult } from '../../shared/common/page-result';

@Injectable()
export class RatingsApi {

  constructor(private http: HttpClient, private adapter: RatingAdapter) { }


  getGroupedRatings(bookId: number) {
    return this.http.get(GET_BOOK_GROUPED_RATINGS(bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => { return { bookId: response.bookId, ratings: response.groupedRatings } }))
  }

  getUserBookRating(userId: number, bookId: number) {
    return this.http.get(GET_USER_BOOK_RATING(bookId, userId), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: RatingResponse) => this.adapter.adapt(response)));
  }

  getUserRatings(userId: number, query: Query) {
    return this.http.get(GET_USER_RATINGS(userId, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: PageResult) => {
        return {
          items: this.mapRatings(response),
          page: response.page,
          totalItems: response.totalItems,
          pagesCount: response.pagesCount
        }
      }))
  }

  getMultipleRatings(userId: number, bookIds: number[]) {
    let params = new HttpParams();
    bookIds.forEach(id => params = params.append('bookIds', JSON.stringify(id)));

    return this.http.get(GET_MULTIPLE_RATINGS(userId), { params: params, headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))));
  }



  private mapRatings = (response: any) => Array.from(response.items).map(item => this.adapter.adapt(item));
}
