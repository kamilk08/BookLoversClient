import { AddFollowerState } from "../add-follower.reducer";

import * as fromActions from '../add-follower.actions';
import * as fromReducer from '../add-follower.reducer';
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('ADD_FOLLOWERS_REDUCER', () => {

  let followed: Reader = new Reader(new ReaderDetails('followed', 'role', new Date()), 1);
  followed.identification.id = 1;
  let followedBy: Reader = new Reader(new ReaderDetails('followedBy', 'role', new Date()), 1);
  followedBy.identification.id = 2;

  const initialState: AddFollowerState = {
    follower: undefined,
    followedBy: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_FOLLOWER', () => {
    it('should return new state with updated properties', () => {

      const action = fromActions.ADD_FOLLOWER({ payload: { followed, followedBy } });

      const newState = fromReducer.addFollowerReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.followedBy).toBeDefined();
      expect(newState.follower).toBeDefined();
    });
  });

  describe('ADD_FOLLOWER_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {

      const action = fromActions.ADD_FOLLOWER_SUCCESS({ payload: { followedById: 1, followedId: 2 } });

      const newState = fromReducer.addFollowerReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('ADD_FOLLOWER_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.ADD_FOLLOWER_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addFollowerReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });

  });

});
