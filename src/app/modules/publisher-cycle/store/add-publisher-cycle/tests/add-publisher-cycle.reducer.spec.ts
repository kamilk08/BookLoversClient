import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import * as fromActions from '../add-publisher-cycle.actions';
import * as fromReducer from '../add-publisher-cycle.reducer';
import { AddPublisherCycleState } from '../add-publisher-cycle.reducer';

describe('ADD_PUBLISHER_CYCLE_REDUCER', () => {

  const initialState: AddPublisherCycleState = {
    publisherCycle: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_PUBLISHER_CYCLE', () => {
    it('should return new state with defined publisher cycle property', () => {

      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const action = fromActions.ADD_PUBLISHER_CYCLE({ payload: { publisherCycle: cycle } });

      const newState = fromReducer.addPublisherCycleReducer(initialState, action);

      expect(newState.publisherCycle).toEqual(cycle);
      expect(newState.processing).toBeTruthy();
    });
  });

  describe('ADD_PUBLISHER_CYCLE_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {

      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const action = fromActions.ADD_PUBLISHER_CYCLE({ payload: { publisherCycle: cycle } });

      const newState = fromReducer.addPublisherCycleReducer(initialState, action);

      const secondAction = fromActions.ADD_PUBLISHER_CYCLE_SUCCESS({ payload: { publisherCycleId: 1 } });

      const secondState = fromReducer.addPublisherCycleReducer(newState, secondAction);

      expect(secondState.processing).toBeFalsy();
    });
  });

  describe('ADD_PUBLISHER_CYCLE_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.ADD_PUBLISHER_CYCLE_FALIURE({ payload: { model: error } });

      const newState = fromReducer.addPublisherCycleReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
