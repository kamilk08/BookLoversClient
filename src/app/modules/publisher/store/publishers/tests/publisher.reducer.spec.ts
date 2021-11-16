import { PublishersState } from "../publisher.reducer";

import * as fromActions from '../publisher.actions';
import * as fromReducer from '../publisher.reducer';
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('PUBLISHER_REDUCER_TESTS', () => {

  const initialState: PublishersState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_PUBLISHER', () => {
    it('should return new state with processing set to true', () => {

      const action = fromActions.SELECT_PUBLISHER({ payload: { id: 1 } });

      const newState = fromReducer.publisherReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_PUBLISHER', () => {
    it('should return new state with updated entities', () => {

      const publisher = new Publisher('publisher');
      publisher.setPublisherId(1);

      const action = fromActions.FETCH_PUBLIHSER({ payload: { publisher } });

      const newState = fromReducer.publisherReducer(initialState, action);

      expect(newState.entities[publisher.identification.id]).toEqual(publisher);
    });

  });

  describe('FETCH_PUBLISHER_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.FETCH_PUBLISHER_FALIURE({ payload: { model: error } });

      const newState = fromReducer.publisherReducer(initialState, action);

      expect(newState.error).not.toBeNull();
    });

  });

});
