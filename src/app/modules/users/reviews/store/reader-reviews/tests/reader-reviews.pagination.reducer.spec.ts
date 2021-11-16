import { ReaderPaginatedReviewsState } from "../reader-reviews-pagination.reducer";

import * as fromActions from '../reader-reviews-pagination.actions';
import * as fromReducer from '../reader-reviews-pagination.reducer';
import { DATE_REVIEWS_QUERY } from "../../../models/reviews-by-date.query";
import { ReviewsPageResult } from "src/app/modules/shared/common/page-result";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { UUID } from "angular2-uuid";
import { SORT_REVIEWS_BY_DATE } from "../../../models/reviews-sort-type";

describe('READER_REVIEWS_PAGINATION_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: ReaderPaginatedReviewsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_READER_REVIEWS_PAGE', () => {
    it('should return new state with processing', () => {
      const action = fromActions.SELECT_READER_REVIEWS_PAGE({ payload: { readerId: 1, query: DATE_REVIEWS_QUERY() } });

      const newState = fromReducer.readerReviewsPaginationReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });

  });

  describe('SET_READER_REVIEWS_PAGE', () => {
    it('should return new state with updated entities property', () => {
      const pageResult: ReviewsPageResult = {
        items: [review],
        totalItems: 1,
        page: 0,
        pagesCount: 1,
        withContent: true,
        sortType: SORT_REVIEWS_BY_DATE,
        sortOrder: true
      };

      const action = fromActions.SET_READER_REVIEWS_PAGE({ payload: { readerId: 1, pageResult } });

      const newState = fromReducer.readerReviewsPaginationReducer(initialState, action);

      expect(newState.entities[action.payload.readerId]).toEqual(pageResult);
    })
  });

  describe('REORDER_READER_REVIEWS_PAGE', () => {
    it('should return new state with updated entities property aslong with updated sortOrder and sortType', () => {

      const pageResult: ReviewsPageResult = {
        items: [review],
        totalItems: 1,
        page: 0,
        pagesCount: 1,
        withContent: true,
        sortType: SORT_REVIEWS_BY_DATE,
        sortOrder: true
      };

      const firstAction = fromActions.SET_READER_REVIEWS_PAGE({ payload: { readerId: 1, pageResult } });

      let newState = fromReducer.readerReviewsPaginationReducer(initialState, firstAction);

      const action = fromActions.REORDER_READER_REVIEWS_PAGE({ payload: { readerId: 1, query: DATE_REVIEWS_QUERY() } })
      newState = fromReducer.readerReviewsPaginationReducer(newState, action);

      const result = newState.entities[action.payload.readerId] as ReviewsPageResult;

      expect(result.sortType).toEqual(action.payload.query.sortType);
      expect(result.sortOrder).toEqual(action.payload.query.descending);
    });
  });

});
