import { AddPublisherState } from "../add-publisher.reducer";

import * as fromActions from '../add-publisher.actions';
import * as fromReducer from '../add-publisher.reducer';
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('ADD_PUBLISHER_REDUCER', () => {

  const initialState: AddPublisherState = {
    addedPublisher: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_PUBLISHER', () => {
    it('should return new state with processing property set to true', () => {
      const publisher = new Publisher('name');
      publisher.setPublisherId(1);

      const action = fromActions.ADD_PUBLISHER({ payload: { publisher } });

      const newState = fromReducer.addPublisherReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('ADD_PUBLISHER_SUCCESS', () => {
    it('should return new state with processing property set to false and addedPublisher set to defined value', () => {

      const publisher = new Publisher('name');

      const action = fromActions.ADD_PUBLISHER({ payload: { publisher } });

      const oldState = fromReducer.addPublisherReducer(initialState, action);

      const addPublisherSuccessAction = fromActions.ADD_PUBLISHER_SUCCESS({ payload: { publisherId: 1 } });

      const newState = fromReducer.addPublisherReducer(oldState, addPublisherSuccessAction);

      expect(newState.addedPublisher.identification.id).toEqual(addPublisherSuccessAction.payload.publisherId);
    });
  });

  describe('ADD_PUBLISHER_FALIURE', () => {
    it('should return new state with defined error property and processing set to false', () => {

      const action = fromActions.ADD_PUBLISHER_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addPublisherReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
