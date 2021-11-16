import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { ReviewsEffects } from "../review.effects"

import * as fromActions from '../review.actions';
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { ReviewsState } from "../review.reducer";

describe('REVIEWS_EFFECTS_TESTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: ReviewsEffects;
  let api: ReviewsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ApiModule],
      providers: [
        ReviewsEffects,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        ErrorActions,
        provideMockStore<ReviewsState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ReviewsEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_USER_REVIEW', () => {
    it('should assign FETCH_REVIEW when api call was successfull and user has a review', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_REVIEW({ payload: { readerId: 1, bookId: 1 } });

        actions$ = hot('a', { a: action });

        spyOn(api, 'getUserReview').and.returnValue(of(review));

        const completion = fromActions.FETCH_REVIEW({ payload: { review } });

        expectObservable(effects.selectUserReview$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign REVIEW_ACTION_SUCCESS when api call was successfull and user does not have a review', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_REVIEW({ payload: { readerId: 1, bookId: 1 } });

        actions$ = hot('a', { a: action });

        spyOn(api, 'getUserReview').and.returnValue(of(undefined));

        const completion = fromActions.REVIEW_ACTION_SUCCESS();

        expectObservable(effects.selectUserReview$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign REVIEW_ACTION_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_REVIEW({ payload: { readerId: 1, bookId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getUserReview').and.returnValue(response as any);

        const completion = fromActions.FETCH_REVIEW_FALIURE({ payload: { error } });

        expectObservable(effects.selectUserReview$)
          .toBe('-b', { b: completion });

      });

    });
  })

})
