import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { ReviewLikesEffects } from "../review-likes.effects";

import * as fromActions from '../review-likes.actions';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { UUID } from "angular2-uuid";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { ReviewsFacade } from "../../reviews/reviews.facade";
import { UPDATE_REVIEW } from "../../reviews/review.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";

describe('REVIEW_LIKES_EFFECTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true),
    new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: ReviewLikesEffects;
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
        ReviewLikesEffects,
        ErrorActions,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<ReviewLikesEffects>({}),
        {
          provide: ReviewsFacade,
          useValue: {
            likedReview$: of(review),
            unlikedReview$: of(review)
          }
        }
      ]
    });

    effects = TestBed.get(ReviewLikesEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('LIKE_REVIEW$', () => {
    it('should assign LIKE_REVIEW_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;

        const action = fromActions.LIKE_REVIEW({ payload: { review, userId } })

        spyOn(api, 'likeReview').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.LIKE_REVIEW_SUCCESS();

        expectObservable(effects.likeReview$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign LIKE_REVIEW_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;

        const action = fromActions.LIKE_REVIEW({ payload: { review, userId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'likeReview').and.returnValue(response as any);

        const completion = fromActions.LIKE_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.likeReview$).toBe('-b', { b: completion });
      });

    });
  });

  describe('LIKE_REVIEW_SUCCESS$', () => {
    it('it should assign UPDATE_REVIEW action and SHOW_SUCCESS_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.LIKE_REVIEW_SUCCESS();

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_REVIEW({ payload: { review } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review liked successfully.😊' } });

        expectObservable(effects.likeReviewSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          })

      })
    });

  });

  describe('UNLIKE_REVIEW$', () => {
    it('should assign UNLIKE_REVIEW_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.UNLIKE_REVIEW({ payload: { review, userId: 1 } });

        spyOn(api, 'unlikeReview').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.UNLIKE_REVIEW_SUCCESS();

        expectObservable(effects.unlikeReview$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign UNLIKE_REVIEW_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.UNLIKE_REVIEW({ payload: { review, userId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'unlikeReview').and.returnValue(response as any);

        const completion = fromActions.UNLIKE_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.unlikeReview$)
          .toBe('-b', { b: completion });
      })

    });
  });

  describe('UNLIKE_REVIEW_SUCCESS$', () => {
    it('should assign UPDATE_REVIEW and SHOW_SUCCESS_MESSAGE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.UNLIKE_REVIEW_SUCCESS();

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_REVIEW({ payload: { review } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review unliked successfully.😊' } });

        expectObservable(effects.unLikeReviewSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });

    });

  });

});
