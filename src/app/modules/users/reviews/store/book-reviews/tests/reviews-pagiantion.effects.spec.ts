import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { BookReviewsPaginationEffects } from "../reviews-pagination.effects";

import * as fromActions from '../reviews-pagination.actions';
import { DATE_REVIEWS_QUERY } from "../../../models/reviews-by-date.query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MANY_REVIEWS } from "../../reviews/review.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { provideMockStore } from "@ngrx/store/testing";
import { BookPaginatedReviews } from "../reviews-pagination.reducer";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('BOOK_REVIEWS_PAGINATION_EFFECTS', () => {

  let effects: BookReviewsPaginationEffects;
  let api: ReviewsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule
      ],
      providers: [
        BookReviewsPaginationEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<BookPaginatedReviews>({})
      ]
    });

    effects = TestBed.get(BookReviewsPaginationEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_BOOK_REVIEWS_PAGE$', () => {
    it('should assign FETCH_MANY_REVIEWS and SET_BOOK_REVIEWS_PAGE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOK_REVIEWS_PAGE({ payload: { bookId: 1, query: DATE_REVIEWS_QUERY() } });

        const reviews = []
        const pageResult: PageResult = {
          items: [],
          page: 0,
          pagesCount: 0,
          totalItems: 0
        };

        spyOn(api, 'getBookReviews').and.returnValue(of({
          reviews,
          pageResult
        }))

        actions$ = hot('a', { a: action });

        const firstAction = FETCH_MANY_REVIEWS({ payload: { reviews: [] } });
        const secondAction = fromActions.SET_BOOK_REVIEWS_PAGE({ payload: { pageResult } });

        expectObservable(effects.selectBookReviewsPage$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      })

    });

    it('should assign REVIEWS_PAGE_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOK_REVIEWS_PAGE({ payload: { bookId: 1, query: DATE_REVIEWS_QUERY() } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBookReviews').and.returnValue(response as any);

        const completion = fromActions.REVIEWS_PAGE_FALIURE({ payload: { error } });

        expectObservable(effects.selectBookReviewsPage$)
          .toBe('-b', { b: completion });
      });

    });
  });



});
