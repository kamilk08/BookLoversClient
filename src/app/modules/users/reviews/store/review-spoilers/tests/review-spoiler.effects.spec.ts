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
import { ReviewsFacade } from "../../reviews/reviews.facade";
import { ReviewSpoilerEffects } from "../review-spoiler.effects";

import * as fromActions from '../review-spoiler.actions';
import { UPDATE_REVIEW } from "../../reviews/review.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ReviewSpoilersState } from "../review-spoiler.reducer";

describe('REVIEW_SPOILER_EFFECTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true),
    new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: ReviewSpoilerEffects;
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
        ReviewSpoilerEffects,
        ErrorActions,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<ReviewSpoilersState>({}),
        {
          provide: ReviewsFacade,
          useValue: {
            reviewSpoiler$: of(review)
          }
        }
      ]
    });

    effects = TestBed.get(ReviewSpoilerEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_SPOILER_TAG', () => {
    it('should assign ADD_SPOILER_TAG_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_SPOILER_TAG({ payload: { review, userId: 1 } });

        spyOn(api, 'addSpoilerTag').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_SPOILER_TAG_SUCCESS();

        expectObservable(effects.addSpoilerTag$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign ADD_SPOILER_TAG_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_SPOILER_TAG({ payload: { review, userId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addSpoilerTag').and.returnValue(response);

        const completion = fromActions.ADD_SPOILER_TAG_FALIURE({ payload: { model: error } });

        expectObservable(effects.addSpoilerTag$)
          .toBe('-b', { b: completion });

      });
    });
  });

  describe('ADD_SPOILER_TAG_SUCCESS', () => {
    it('should assign UPDATE_REVIEW action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_SPOILER_TAG_SUCCESS();

        actions$ = hot('a', { a: action });

        const completion = UPDATE_REVIEW({ payload: { review } });

        expectObservable(effects.addSpoilerTagSuccess$).toBe('b', { b: completion });

      });
    });
  });

  describe('REMOVE_SPOILER_TAG', () => {
    it('should assign REMOVE_SPOILER_TAG_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_SPOILER_TAG({ payload: { review, userId: 1 } });

        spyOn(api, 'removeSpoilerTag').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.REMOVE_SPOILER_TAG_SUCCESS();

        expectObservable(effects.removeSpoilerTag$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign REMOVE_SPOILER_TAG_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_SPOILER_TAG({ payload: { review, userId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeSpoilerTag').and.returnValue(response);

        const completion = fromActions.REMOVE_SPOILER_TAG_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeSpoilerTag$)
          .toBe('-b', { b: completion });
      });
    });
  });

})
