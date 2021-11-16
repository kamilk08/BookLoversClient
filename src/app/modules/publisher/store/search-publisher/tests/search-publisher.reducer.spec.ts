import { ApiError } from 'src/app/modules/api/api-error.model';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import { DEFAULT_QUERY } from 'src/app/modules/shared/common/query';
import * as fromActions from '../search-publisher.actions';
import * as fromReducer from '../search-publisher.reducer';
import { SearchPublisherState } from "../search-publisher.reducer";

describe('SEARCH_PUBLISHER_REDUCER', () => {

  const initialState: SearchPublisherState = {
    entities: [],
    processing: false,
    query: undefined,
    error: undefined
  };


  describe('START_FILTERING_PUBLISHERS', () => {
    it('should return new state with processing set to true', () => {
      const query = DEFAULT_QUERY();
      const action = fromActions.START_FILTERING_PUBLISHERS({ payload: { query } });

      const newState = fromReducer.searchPublisherReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    })
  });

  describe('FETCH_FILTERED_PUBLISHERS', () => {
    it('should return new state with updated entities', () => {

      const publisher = new Publisher('publisher');
      publisher.setPublisherId(1);

      const action = fromActions.FETCH_FILTERED_PUBLISHERS({ payload: { publishers: [publisher] } });

      const newState = fromReducer.searchPublisherReducer(initialState, action);

      expect(newState.entities).toEqual(action.payload.publishers);
    });
  });

  describe('FILTER_PUBLISHER_FALIURE', () => {
    it('should return new state with updated error property', () => {

      const error = new ApiError();

      const action = fromActions.FILTER_PUBLISHER_FALIURE({ payload: { error } });

      const newState = fromReducer.searchPublisherReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});

