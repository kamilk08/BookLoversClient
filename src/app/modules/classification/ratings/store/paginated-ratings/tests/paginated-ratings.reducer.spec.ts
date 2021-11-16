import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_QUERY } from 'src/app/modules/shared/common/query';
import * as fromActions from '../paginated-ratings.actions';
import * as fromReducer from '../paginated-ratings.reducer';
import { PaginatedRatings } from '../paginated-ratings.reducer';

describe('PAGINATED_RATINGS_REDUCER', () => {

  const initialState: PaginatedRatings = {
    entities: undefined,
    pageResult: undefined,
    processing: false,
    error: undefined
  };

  describe('SELECT_PAGINATE_USER_RATINGS', () => {
    it('should return new state with processing set to true', () => {

      const action = fromActions.SELECT_PAGINATED_USER_RATINGS({ payload: { userId: 1, query: DEFAULT_QUERY() } });

      const newState = fromReducer.paginatedRatingsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    })
  });

  describe('FETCH_PAGINATED_USER_RATINGS', () => {
    it('should return new state with new pageResult and paginated ratings', () => {

      const bookId = 1;
      const userId = 1;
      const stars = 1;
      const rating = new Rating(bookId, userId, stars);

      const pageResult: PageResult = {
        items: [rating],
        totalItems: 1,
        page: 0,
        pagesCount: 1
      };

      const action = fromActions.FETCH_PAGINATED_USER_RATINGS({ payload: { pageResult: pageResult, ratings: pageResult.items } });

      const newState = fromReducer.paginatedRatingsReducer(initialState, action);

      expect(newState.pageResult).toEqual(pageResult);
      expect(newState.entities).toEqual(pageResult.items);

    });
  });

  describe('FETCH_PAGINATED_USER_RATINGS_ERROR', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.FETCH_PAGINATED_USER_FALIURE({ payload: { error } });

      const newState = fromReducer.paginatedRatingsReducer(initialState, action);

      expect(newState.error).toEqual(error);

    });
  });

});
