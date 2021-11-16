import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { AddReviewEffects } from "../add-review.effects";

import * as fromActions from '../add-review-actions';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { UUID } from "angular2-uuid";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { AddReviewResponse } from "src/app/modules/api/reviews/responses/add-review.response";
import { FETCH_REVIEW } from "../../reviews/review.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { AddReviewState } from "../add-review.reducer";

describe('ADD_REVIEW_EFFECTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: AddReviewEffects;
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
        AddReviewEffects,
        provideMockStore<AddReviewState>({}),
        provideMockActions(() => actions$),
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    effects = TestBed.get(AddReviewEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_REVIEW$', () => {
    it('should assign ADD_REVIEW_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_REVIEW({ payload: { review } })

        const response: AddReviewResponse = {
          reviewId: 1
        };

        spyOn(api, 'addReview').and.returnValue(of(response))

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_REVIEW_SUCCESS({ payload: { reviewId: response.reviewId, review } });

        expectObservable(effects.addReview$)
          .toBe('b', { b: completion });
      });


    });
    it('should assign ADD_REVIEW_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_REVIEW({ payload: { review } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addReview').and.returnValue(response as any);

        const completion = fromActions.ADD_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.addReview$)
          .toBe('-b', { b: completion });
      })

    });
  });

  describe('ADD_REVIEW_SUCCESS$', () => {
    it('should assign FETCH_REVIEW and SHOW_SUCCESS_MESSAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_REVIEW_SUCCESS({ payload: { reviewId: 1, review } });

        actions$ = hot('a', { a: action });

        const firstAction = FETCH_REVIEW({ payload: { review } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review added successfully.😊' } });

        expectObservable(effects.addReviewSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      });
    });
  });

});
