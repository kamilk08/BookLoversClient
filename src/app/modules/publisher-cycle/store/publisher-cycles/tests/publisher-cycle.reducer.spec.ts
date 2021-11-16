import { UUID } from 'angular2-uuid';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import * as fromActions from '../publisher-cycle.actions';
import * as fromReducer from '../publisher-cycle.reducer';
import { PublisherCyclesState } from '../publisher-cycle.reducer';

describe('PUBLISHER_CYCLE_REDUCER', () => {

  const initialState: PublisherCyclesState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_PUBLISHER_CYCLE', () => {
    it('should return new state with processing property set to true', () => {

      const id: number = 1;

      const action = fromActions.SELECT_PUBLISHER_CYCLE({ payload: { id } });

      const newState = fromReducer.publisherCycleReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_PUBLISHER_CYCLE', () => {
    it('should return new state with entites property updated', () => {
      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const action = fromActions.FETCH_PUBLISHER_CYCLE({ payload: { cycle } });

      const newState = fromReducer.publisherCycleReducer(initialState, action);

      expect(newState.entities[cycle.identification.id]).toEqual(cycle);

    });
  });

  describe('FETCH_MULTIPLE_PUBLISHER_CYCLE', () => {
    it('should return new state with entities property updated', () => {
      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const action = fromActions.FETCH_MULTIPLE_PUBLISHER_CYCLES({ payload: { cycles: [cycle] } });

      const newState = fromReducer.publisherCycleReducer(initialState, action);

      expect(newState.entities[cycle.identification.id]).toEqual(cycle);
    });
  });
});
