import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from '../remove-author.actions';
import * as fromReducer from '../remove-author.reducer';
import { RemoveAuthor } from '../remove-author.reducer';

describe('remove author reducer', () => {
  const initialState: RemoveAuthor = {
    processing: false,
    succeded: undefined,
    error: undefined
  };

  describe('REMOVE_AUTHOR', () => {
    it('should return new state with processing set to true', () => {

      const action = fromActions.REMOVE_AUTHOR({ payload: { author: undefined } });

      const newState = fromReducer.removeAuthorReducer(initialState, action);

      expect(newState.processing)
        .toBeTruthy();
    });
  });

  describe('REMOVE_AUTHOR_FALIURE', () => {
    it('should return new state with processing set to false and succeded to false', () => {
      const action = fromActions.REMOVE_AUTHOR_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.removeAuthorReducer(initialState, action);

      expect(newState.processing)
        .toBeFalsy();

      expect(newState.succeded).toBeFalsy();
    })
  });

  describe('REMOVE_AUTHOR_SUCCESS', () => {
    it('should return new state with processing set to false and succeded to true', () => {
      const action = fromActions.REMOVE_AUTHOR_SUCCESS();

      const newState = fromReducer.removeAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.succeded).toBeTruthy();
    })
  })

})
