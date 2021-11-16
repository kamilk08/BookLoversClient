
import { ReaderDetails } from 'src/app/modules/api/readers/models/reader-details.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import * as fromActions from '../reader.actions';
import * as fromReducer from '../reader.reducer';
import { ReadersState } from '../reader.reducer';


describe('READER_REDUCER', () => {

  let reader = new Reader(new ReaderDetails('userName', 'role', new Date()), 1);
  reader.identification.id = 1;

  const initialState: ReadersState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_READER', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_READER({ payload: { readerId: reader.identification.id } });

      const newState = fromReducer.readerReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_READER', () => {
    it('should return new state with updated entities property', () => {

      const action = fromActions.FETCH_READER({ payload: { reader } });

      const newState = fromReducer.readerReducer(initialState, action);

      expect(newState.entities[reader.identification.id]).toEqual(reader);

    });
  });

  describe('FETCH_MULTIPLE_READERS', () => {
    it('should return new state with updated entities property', () => {

      const readers = [reader];

      const action = fromActions.FETCH_MULTIPLE_READERS({ payload: { readers } });

      const newState = fromReducer.readerReducer(initialState, action);

      expect(newState.entities[reader.identification.id]).toEqual(reader);

    })
  });

})
