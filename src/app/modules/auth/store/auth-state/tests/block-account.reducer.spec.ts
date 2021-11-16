import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from '../block-account/block-account.actions';
import * as fromReducer from '../block-account/block-account.reducer';
import { BlockAccountState } from '../block-account/block-account.reducer';


describe('block account reducer', () => {
  const initialState: BlockAccountState = {
    userGuid: undefined,
    processing: false,
    error: undefined
  };

  describe('BLOCK_ACCOUNT', () => {
    it('should return new state with assinged user guid and processig property changed to true', () => {
      const guid = UUID.UUID();

      const action = fromActions.BLOCK_ACCOUNT({ payload: { readerGuid: guid } })

      const newState = fromReducer.blockAccountReducer(initialState, action);

      expect(newState.userGuid).toBe(guid);
      expect(newState.processing).toBeTruthy();
    });
  });

  describe('BLOCK_ACCOUNT_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {
      const action = fromActions.BLOCK_ACCOUNT_SUCCESS({ payload: { readerGuid: UUID.UUID() } });

      const newState = fromReducer.blockAccountReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('BLOCK_ACCOUNT_FALIURE', () => {
    it('should return new state with defined error property and processing property set to false', () => {
      const error = new ApiError();
      const action = fromActions.BLOCK_ACCOUNT_FALIURE({ payload: { error } });

      const newState = fromReducer.blockAccountReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.error).toBeDefined();
    });
  })
})
