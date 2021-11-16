
import * as fromActions from '../reader-followers.actions';
import * as fromReducer from '../reader-followers.reducer';
import { ReaderFollowersState } from '../reader-followers.reducer';

describe('READER_FOLLOWERS_REDUCER', () => {

  const initialState: ReaderFollowersState = {
    entities: [],
    ids: [],
    processing: false,
    error: undefined
  }

  describe('FETCH_READER_FOLLOWERS', () => {
    it('should return new state with updated entities property', () => {

      const followers = [];

      const readerId = 1;

      const action = fromActions.FETCH_READER_FOLLOWERS({ payload: { readerId, followers } });

      const newState = fromReducer.readerFollowersReducer(initialState, action);

      expect(newState.entities[readerId]).toEqual(followers)

    });
  });

  describe('ADD_FOLLOWER_TO_READER', () => {
    it('should return new state with added follower', () => {

      const followers = [];

      const readerId = 1;
      const followedById = 2;

      const firstAction = fromActions.FETCH_READER_FOLLOWERS({ payload: { readerId, followers } });

      let newState = fromReducer.readerFollowersReducer(initialState, firstAction);

      const action = fromActions.ADD_FOLLOWER_TO_READER({ payload: { followedId: readerId, followedById } })

      newState = fromReducer.readerFollowersReducer(newState, action);

      expect(newState.entities[readerId].length).toBe(1);

    });
  });

  describe('REMOVE_FOLLOWER_FROM_READER', () => {
    it('should return new state with removed follower', () => {

      const followers = [];

      const readerId = 1;
      const followedById = 2;

      const firstAction = fromActions.FETCH_READER_FOLLOWERS({ payload: { readerId, followers } });

      let newState = fromReducer.readerFollowersReducer(initialState, firstAction);

      const secondAction = fromActions.ADD_FOLLOWER_TO_READER({ payload: { followedId: readerId, followedById } })

      newState = fromReducer.readerFollowersReducer(newState, secondAction);

      const action = fromActions.REMOVE_FOLLOWER_FROM_READER({ payload: { followedId: readerId, followedById } });

      newState = fromReducer.readerFollowersReducer(newState, action);

      expect(newState.entities[readerId].length).toEqual(0);
    });
  });


});
