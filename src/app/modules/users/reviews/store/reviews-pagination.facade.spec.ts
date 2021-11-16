import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ReviewsPageResult } from "src/app/modules/shared/common/page-result";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";

import { reviewsStateReducer } from ".";
import { DATE_REVIEWS_QUERY } from "../models/reviews-by-date.query";
import { LIKES_REVIEWS_QUERY } from "../models/reviews-by-likes.query";
import { SORT_REVIEWS_BY_DATE, SORT_REVIEWS_BY_LIKES } from "../models/reviews-sort-type";
import { BookReviewsPaginationEffects } from "./book-reviews/reviews-pagination.effects";
import { ReaderReviewsPaginationEffects } from "./reader-reviews/reader-reviews-pagination.effects";
import { ReviewsPaginationFacade } from "./reviews-pagination.facade";

describe('REVIEWS_PAGINATION_FACADE', () => {

  let facade: ReviewsPaginationFacade;
  let api: ReviewsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('reviews', reviewsStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BookReviewsPaginationEffects, ReaderReviewsPaginationEffects])
      ],
      providers: [
        ReviewsPaginationFacade,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        BookReviewsPaginationEffects, ReaderReviewsPaginationEffects
      ]
    });
    facade = TestBed.get(ReviewsPaginationFacade);
    api = TestBed.get(ReviewsApi);
  });

  describe('SELECT_BOOK_REVIEWS', () => {
    it('should dispatch an action and as a result of which bookReviewsPageResult$ should emit new value', async (done) => {

      const bookId = 1;

      const reviews = [];
      const pageResult: ReviewsPageResult = {
        page: 0,
        pagesCount: 0,
        totalItems: 0,
        items: reviews,
        withContent: true,
        sortOrder: true,
        sortType: SORT_REVIEWS_BY_LIKES
      }

      spyOn(api, 'getBookReviews').and.returnValue(of({ reviews, pageResult }));

      facade.selectBookReviews(bookId, LIKES_REVIEWS_QUERY());

      const subscription = facade.bookReviewsPageResult$
        .subscribe(val => {
          expect(val).toEqual(pageResult);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_READER_REVIEWS', () => {
    it('should dispatch an action and as a result of which readerReviewsPageResult$ should emit new value', async (done) => {

      const readerId = 1;

      const reviews = [];
      const pageResult: ReviewsPageResult = {
        page: 0,
        pagesCount: 0,
        totalItems: 0,
        items: reviews,
        withContent: true,
        sortOrder: true,
        sortType: SORT_REVIEWS_BY_LIKES
      }

      spyOn(api, 'getReaderReviews').and.returnValue(of({
        reviews, pageResult
      }))

      facade.selectReaderReviews(readerId, LIKES_REVIEWS_QUERY());

      const subscription = facade.readerReviewsPageResult$(readerId)
        .subscribe(val => {
          expect(val).toEqual(pageResult);
          done();
        });

      subscription.unsubscribe();
    })
  });


});
