import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddShelfResponse } from 'src/app/modules/api/bookcases/api/responses/add-shelf.response';
import { Shelf, Bookcase } from 'src/app/modules/bookcases/models';
import * as fromActions from '../add-custom-shelf.actions';
import * as fromReducer from '../add-custom-shelf.reducer';
import { AddShelfState } from '../add-custom-shelf.reducer';

describe('ADD_CUSTOM_SHELF_REDUCER', () => {

  let shelf: Shelf;
  let bookcase: Bookcase;

  shelf = new Shelf(1, 'TEST_SHELF');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  const initialState: AddShelfState = {
    shelf: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_CUSTOM_SHELF', () => {
    it('should return new state with processing property set to true and defined shelf property', () => {

      const action = fromActions.ADD_CUSTOM_SHELF({ payload: { shelf, bookcase } });

      const newState = fromReducer.addShelfReducer(initialState, action);

      expect(newState.shelf).toEqual(shelf);
      expect(newState.processing).toBeTruthy();
    });
  })


  describe('ADD_CUSTOM_SHELF_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.ADD_CUSTOM_SHELF_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addShelfReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  })

  describe('ADD_CUSTOM_SHELF_SUCCESS', () => {
    it('should return new state with updated shelfId and processing set to false', () => {

      const addShelfAction = fromActions.ADD_CUSTOM_SHELF({ payload: { bookcase, shelf } });

      let newState = fromReducer.addShelfReducer(initialState,addShelfAction);

      const shelfResponse: AddShelfResponse = {
        bookcaseGuid: UUID.UUID(),
        shelfGuid: UUID.UUID(),
        shelfId: 1,
        shelfName: 'shelfName'
      };

      const action = fromActions.ADD_CUSTOM_SHELF_SUCCESS({ payload: { bookcase, shelfResponse } })

      newState = fromReducer.addShelfReducer(newState, action);

      expect(newState.shelf.identification.id).toEqual(shelfResponse.shelfId);

    });
  })

});
