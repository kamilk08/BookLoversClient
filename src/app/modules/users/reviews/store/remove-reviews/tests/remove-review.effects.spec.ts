import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { RemoveReviewEffects } from "../remove-review.effects";

import * as fromActions from '../remove-review.actions';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { REMOVE_FROM_CURRENT_REVIEWS } from "../../reviews/review.actions";
import { SHOW_FALIURE_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { RemoveReviewState } from "../remove-review.reducer";

describe('REMOVE_REVIEW_EFFECTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: RemoveReviewEffects;
  let api: ReviewsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        ErrorActions,
        ApiErrorAdapter,
        RemoveReviewEffects,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<RemoveReviewState>({})
      ]
    });

    effects = TestBed.get(RemoveReviewEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('REMOVE_REVIEW$', () => {
    it('should asssign REMOVE_REVIEW_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_REVIEW({ payload: { review } })

        actions$ = hot('a', { a: action });

        spyOn(api, 'removeReview').and.returnValue(of({}));

        const completion = fromActions.REMOVE_REVIEW_SUCCESS({ payload: { review } });

        expectObservable(effects.removeReview$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign REMOVE_REVIEW_FALIURE when api call was a faliure', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_REVIEW({ payload: { review } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeReview').and.returnValue(response);

        const completion = fromActions.REMOVE_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeReview$)
          .toBe('-b', { b: completion });

      });

    });
  });

  describe('REMOVE_REVIEW_SUCCESS$', () => {
    it('should assign REMOVE_FROM_CURRENT_REVIEW action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_REVIEW_SUCCESS({ payload: { review } });

        actions$ = hot('a', { a: action });

        const completion = REMOVE_FROM_CURRENT_REVIEWS({ payload: { review } });

        expectObservable(effects.removeReviewSuccess$)
          .toBe('b', { b: completion });

      });

    });
  });
})
