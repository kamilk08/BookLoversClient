
import { HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReportReview } from 'src/app/modules/api/reviews/models/report-review.model';
import { ReviewContent } from 'src/app/modules/api/reviews/models/review-content.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { ReviewedBook } from 'src/app/modules/api/reviews/models/reviewed-book.model';
import { ReviewedBy } from 'src/app/modules/api/reviews/models/reviewed-by.model';
import * as fromActions from '../report-review.actions';
import * as fromReducer from '../report-review.reducer';
import { ReportReviewState } from '../report-review.reducer';

describe('REPORT_REVIEW_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;
  review.identification.guid = UUID.UUID();

  const initialState: ReportReviewState = {
    review: undefined,
    userId: undefined,
    processing: false,
    error: undefined
  };

  describe('REPORT_REVIEW', () => {
    it('should return new state with defined review,userId and processing property', () => {

      const action = fromActions.REPORT_REVIEW({ payload: { review, reportReview: new ReportReview(review.identification.guid, 1), userId: 2 } });

      const newState = fromReducer.reporReviewReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.review).toEqual(review);
      expect(newState.userId).toEqual(action.payload.userId);
    });
  });

  describe('REPORT_REVIEW_SUCCESS', () => {
    it('should return new state with updated review property', () => {

      const firstAction = fromActions.REPORT_REVIEW({ payload: { review, reportReview: new ReportReview(review.identification.guid, 1), userId: 2 } });

      let newState = fromReducer.reporReviewReducer(initialState, firstAction);

      const action = fromActions.REPORT_REVIEW_SUCCESS();

      newState = fromReducer.reporReviewReducer(newState, action);

      expect(newState.review.reportedByUsers.length).toEqual(1);
    });
  });

  describe('REPORT_REVIEW_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.REPORT_REVIEW_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.reporReviewReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });
});
