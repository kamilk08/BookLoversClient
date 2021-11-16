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
import { ReportReviewEffects } from "../report-review.effects";

import * as fromActions from '../report-review.actions';
import { ReportReview } from "src/app/modules/api/reviews/models/report-review.model";
import { UPDATE_REVIEW } from "../../reviews/review.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ReportReviewState } from "../report-review.reducer";

describe('REPORT_REVIEW_EFFECTS', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  let effects: ReportReviewEffects;
  let api: ReviewsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        ReportReviewEffects,
        ErrorActions,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<ReportReviewState>({}),
        {
          provide: ReviewsFacade,
          useValue: {
            reportedReview$: of(review)
          }
        }
      ]
    });

    effects = TestBed.get(ReportReviewEffects);
    api = TestBed.get(ReviewsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('REPORT_REVIEW$', () => {
    it('should assign REPORT_REVIEW_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const reportReview: ReportReview = new ReportReview(review.identification.guid, 1);

        const action = fromActions.REPORT_REVIEW({ payload: { review, userId: 12, reportReview } })

        actions$ = hot('a', { a: action });

        spyOn(api, 'reportReview').and.returnValue(of({}));

        const completion = fromActions.REPORT_REVIEW_SUCCESS();

        expectObservable(effects.reportReview$)
          .toBe('b', { b: completion });
      });

    });

    it('shuold assign REPORT_REVIEW_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const reportReview: ReportReview = new ReportReview(review.identification.guid, 1);

        const action = fromActions.REPORT_REVIEW({ payload: { review, userId: 12, reportReview } })

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'reportReview').and.returnValue(response);

        const completion = fromActions.REPORT_REVIEW_FALIURE({ payload: { model: error } });

        expectObservable(effects.reportReview$)
          .toBe('-b', { b: completion });
      });
    });
  });

  describe('REPORT_REVIEW_SUCCESS$', () => {
    it('should assign UPDATE_REVIEW and SHOW_SUCCESS_MESSAGE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REPORT_REVIEW_SUCCESS();

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_REVIEW({ payload: { review } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review reported successfully.😊' } });

        expectObservable(effects.reportReviewSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });

      });

    });
  });
});
