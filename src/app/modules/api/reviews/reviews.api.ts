import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ADD_NEW_REVIEW, SELECT_USER_BOOK_REVIEW, EDIT_REVIEW, LIKE_REVIEW, UNLIKE_REVIEW, ADD_SPOILER_TAG, REMOVE_SPOILER_TAG, REPORT_REVIEW, REMOVE_REVIEW, SELECT_BOOK_REVIEWS, SELECT_READER_REVIEWS_IDS, SELECT_READER_REVIEWS_LIST } from './reviews.urls';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { ReviewAdapter } from './review.adapter';
import { AddReviewResponse } from './responses/add-review.response';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { ReportReview } from './models/report-review.model';
import { AddNewReview } from './models/add-new-reivew.model';
import { EditReview } from './models/edit-review.model';
import { OrderedQuery } from '../../shared/common/query';
import { PageResult, ReviewsPageResult } from '../../shared/common/page-result';

@Injectable()
export class ReviewsApi {

  constructor(private http: HttpClient, private adapter: ReviewAdapter) { }

  getUserReview(userId: number, bookId: number) {
    return this.http.get(SELECT_USER_BOOK_REVIEW(userId, bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  addReview(model: AddNewReview) {
    return this.http.post(ADD_NEW_REVIEW, model, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => {
        return response as AddReviewResponse
      }));
  }

  editReview(model: EditReview) {
    return this.http.put(EDIT_REVIEW, model, { headers: DEFAULT_HEADERS() });
  }

  removeReview(guid: UUID) {
    return this.http.request('delete', REMOVE_REVIEW(guid), { headers: DEFAULT_HEADERS() })
  }

  likeReview(reviewGuid: UUID) {
    return this.http.post(LIKE_REVIEW(reviewGuid), { headers: DEFAULT_HEADERS });
  }

  unlikeReview(reviewGuid: UUID) {
    return this.http.delete(UNLIKE_REVIEW(reviewGuid), { headers: DEFAULT_HEADERS() });
  }

  addSpoilerTag(reviewGuid: UUID) {
    return this.http.post(ADD_SPOILER_TAG(reviewGuid), { headers: DEFAULT_HEADERS() });
  }

  removeSpoilerTag(reviewGuid: UUID) {
    return this.http.delete(REMOVE_SPOILER_TAG(reviewGuid), { headers: DEFAULT_HEADERS() });
  }

  reportReview(model: ReportReview) {
    return this.http.post(REPORT_REVIEW, model, { headers: DEFAULT_HEADERS() });
  }

  getBookReviews(bookId: number, query: OrderedQuery) {
    return this.http.get(SELECT_BOOK_REVIEWS(bookId, query), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => {
        const mappedReviews = this.mapReviews(response);
        return {
          reviews: mappedReviews, pageResult: {
            items: mappedReviews,
            page: response.page,
            totalItems: response.totalItems,
            pagesCount: response.pagesCount
          }
        }
      }));
  }

  getReaderReviews(readerId: number, query: OrderedQuery) {
    return this.http.get(SELECT_READER_REVIEWS_LIST(readerId, query), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: PageResult) => {
        return {
          reviews: this.mapReviews(response),
          pageResult: {
            items: this.mapReviews(response),
            page: response.page,
            totalItems: response.totalItems,
            pagesCount: response.pagesCount,
            sortType: query.sortType,
            sortOrder: query.descending
          } as ReviewsPageResult
        }
      }))
  }

  getReaderReviewsIds(readerId: number, query: OrderedQuery) {
    return this.http.get(SELECT_READER_REVIEWS_IDS(readerId, query))
      .pipe(map((response) => response as PageResult))
  }



  private mapReviews = (response: any) => Array.from(response.items).map(item => this.adapter.adapt(item))

}
