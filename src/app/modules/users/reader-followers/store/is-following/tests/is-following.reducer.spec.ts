import { IsFollowingState } from "../is-following.reducer";

import * as fromActions from '../is-following.actions';
import * as fromReducer from '../is-following.reducer';

describe('IS_FOLLOWING_REDUCER', () => {

  const initialState: IsFollowingState = {
    entities: {},
    processing: false,
    error: undefined
  }

  describe('IS_FOLLOWING', () => {
    it('should return new state with processing property set to true ', () => {

      const followedId = 1;

      const action = fromActions.IS_FOLLOWING({ payload: { followedId } });

      const newState = fromReducer.isFollowingReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });
  });

  describe('FETCH_IS_FOLLOWING_STATE', () => {
    it('should return new state with updated entities property', () => {

      const followedId = 1;

      const action = fromActions.FETCH_IS_FOLLOWING_STATE({ payload: { followedId, flag: true } })

      const newState = fromReducer.isFollowingReducer(initialState, action);

      expect(newState.entities[followedId]).toBeTruthy();

    });
  });

});
