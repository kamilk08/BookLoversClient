import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReviewsApi } from "src/app/modules/api/reviews/reviews.api";
import { EditReviewEffects } from "../edit-review.effects";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";

import * as fromActions from '../edit-review.actions';
import { UPDATE_REVIEW } from "../../reviews/review.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { EditReviewState } from "../edit-review.reducer";


describe('EDIT_REVIEW_EFFECTS', () => {

  let effects: EditReviewEffects;
  let api: ReviewsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        EditReviewEffects,
        ErrorActions,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<EditReviewState>({})
      ]
    });
    effects = TestBed.get(EditReviewEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('EDIT_REVIEW$', () => {
    it('should assign EDIT_REVIEW_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_REVIEW({ payload: { review } });

        spyOn(api, 'editReview').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.EDIT_REVIEW_SUCCESS({ payload: { review } });

        expectObservable(effects.editReview$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign EDIT_REVIEW_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_REVIEW({ payload: { review } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'editReview').and.returnValue(response as any);

        const completion = fromActions.EDIT_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.editReview$)
          .toBe('-b', { b: completion });
      });

    });
  });

  describe('EDIT_REVIEW_SUCCESS$', () => {
    it('should assign two actions UPDATE_REVIEW and SHOW_SUCCESS_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_REVIEW_SUCCESS({ payload: { review } });

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_REVIEW({ payload: { review } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review edited successfully.😊' } });

        expectObservable(effects.editReviewSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      });
    });
  });

});
