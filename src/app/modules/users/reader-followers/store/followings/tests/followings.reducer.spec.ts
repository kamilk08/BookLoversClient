
import { Follower } from 'src/app/modules/shared';
import * as fromActions from '../followings.actions';
import * as fromReducer from '../followings.reducer';
import { ReaderFollowingsState } from '../followings.reducer';

describe('FOLLOWINGS_REDUCER', () => {

  const initialState: ReaderFollowingsState = {
    entities: {},
    ids: [],
    error: undefined
  };


  describe('ADD_FOLLOWING_TO_READER', () => {
    it('should return new state updatede entites property', () => {

      const readerId = 1;
      const followedById = 2;
      const followings = [new Follower(readerId, followedById)];

      const fetchAction = fromActions.FETCH_READER_FOLLOWINGS({ payload: { readerId, followings } })

      const fetchState = fromReducer.readerFollowingsReducer(initialState, fetchAction);

      const newFollowerId = 3;

      const action = fromActions.ADD_FOLLOWING_TO_READER({ payload: { followedById: readerId, followedObjectId: newFollowerId } })

      const newState = fromReducer.readerFollowingsReducer(fetchState, action);

      expect(newState.entities[readerId].some(a => a.followedObjectId === newFollowerId)).toBeTruthy();
    });
  });

  describe('FETCH_READER_FOLLOWINGS', () => {
    it('should return new state with updated entities property', () => {

      const readerId = 1;
      const followedById = 2;
      const followings = [new Follower(readerId, followedById)];

      const action = fromActions.FETCH_READER_FOLLOWINGS({ payload: { readerId, followings } })

      const newState = fromReducer.readerFollowingsReducer(initialState, action);

      expect(newState.entities[readerId]).toEqual(followings);

    });

  });

  describe('REMOVE_FOLLOWINGS_FROM_READER', () => {
    it('should return new state with removed follower', () => {

      const readerId = 1;
      const followedById = 2;
      const followings = [new Follower(readerId, followedById)];

      const fetchAction = fromActions.FETCH_READER_FOLLOWINGS({ payload: { readerId, followings } })

      const fetchState = fromReducer.readerFollowingsReducer(initialState, fetchAction);

      const action = fromActions.REMOVE_FOLLOWING_FROM_READER({ payload: { followedById: readerId, followedObjectId: readerId } });

      const newState = fromReducer.readerFollowingsReducer(fetchState, action);

      expect(newState.entities[readerId].length).toEqual(0);

    });

  });

});
