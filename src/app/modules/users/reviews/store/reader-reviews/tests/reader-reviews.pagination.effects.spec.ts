import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { ReaderReviewsPaginationEffects } from "../reader-reviews-pagination.effects";

import * as fromActions from '../reader-reviews-pagination.actions';
import { DATE_REVIEWS_QUERY } from "../../../models/reviews-by-date.query";
import { ReviewsPageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MANY_REVIEWS } from "../../reviews/review.actions";
import { SORT_REVIEWS_BY_DATE } from "../../../models/reviews-sort-type";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('READER_REVIEWS_PAGINATION_EFFECTS', () => {

  let effects: ReaderReviewsPaginationEffects;
  let api: ReviewsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ApiErrorAdapter,
        ReaderReviewsPaginationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ReaderReviewsPaginationEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });


  describe('SELECT_READER_REVIEWS_PAGE$', () => {
    it('should assign SET_READER_REVIEWS_PAGE and FETCH_MANY_REVIEWS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_READER_REVIEWS_PAGE({ payload: { readerId: 1, query: DATE_REVIEWS_QUERY() } });

        const pageResult: ReviewsPageResult = {
          items: [],
          totalItems: 0,
          page: 0,
          pagesCount: 0,
          withContent: false,
          sortOrder: true,
          sortType: SORT_REVIEWS_BY_DATE
        };

        spyOn(api, 'getReaderReviews').and.returnValue(of({ reviews: [], pageResult }))
        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_READER_REVIEWS_PAGE({ payload: { pageResult, readerId: 1 } });
        const secondAction = FETCH_MANY_REVIEWS({ payload: { reviews: [] } });

        expectObservable(effects.selectReaderReviewsPage$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      });
    });

    it('should assign REVIEWS_PAGE_FALIURE action when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_READER_REVIEWS_PAGE({ payload: { readerId: 1, query: DATE_REVIEWS_QUERY() } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getReaderReviews').and.returnValue(response as any);

        const completion = fromActions.REVIEWS_PAGE_FALIURE({ payload: { error } });

        expectObservable(effects.selectReaderReviewsPage$)
          .toBe('-b', { b: completion });

      });
    });
  });

  describe('SET_READER_REVIEWS_PAGE$', () => {
    it('should set READER_REVIEWS_PAGE_SELECTED after 1.5s', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const pageResult: ReviewsPageResult = {
          items: [],
          totalItems: 0,
          page: 0,
          pagesCount: 0,
          withContent: false,
          sortOrder: true,
          sortType: SORT_REVIEWS_BY_DATE
        };

        const action = fromActions.SET_READER_REVIEWS_PAGE({ payload: { readerId: 1, pageResult } })

        actions$ = hot('a', { a: action });

        const completion = fromActions.READER_REVIEWS_PAGE_SELECTED();

        expectObservable(effects.setReaderReviewsPage$)
          .toBe('1.5s b', { b: completion });
      })

    });
  });

});
