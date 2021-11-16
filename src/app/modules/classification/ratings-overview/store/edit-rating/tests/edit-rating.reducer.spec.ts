import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import * as fromActions from '../edit-rating.actions';
import * as fromReducer from '../edit-rating.reducer';
import { EditRatingState } from '../edit-rating.reducer';

describe('EDIT_RATING_REDUCER', () => {

  const initialState: EditRatingState = {
    newRating: undefined,
    oldRating: undefined,
    processing: false,
    error: undefined
  };

  describe('EDIT_RATING', () => {
    it('should return new state with processing property set to true and newRating set to defined value', () => {

      const bookId = 1;
      const userId = 1;
      const stars = 2;

      const newRating = new Rating(bookId, userId, stars);

      const action = fromActions.EDIT_RATING({ payload: { book: { id: 1, guid: UUID.UUID() }, newRating } });

      const newState = fromReducer.editRatingReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.newRating).toEqual(newRating);

    });
  });

  describe('EDIT_RATING_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.EDIT_RATING_FALIURE({ payload: { model: error } });

      const newState = fromReducer.editRatingReducer(initialState, action);

      expect(newState.error).toEqual(error);
    });
  });

})
