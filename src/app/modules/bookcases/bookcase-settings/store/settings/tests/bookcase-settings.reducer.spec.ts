import { Privacy } from 'src/app/modules/shared/models/privacy';
import { BookcaseSettings } from '../../../models/bookcase-settings.model';
import * as fromActions from '../bookcase-settings.actions';
import * as fromRedcuer from '../bookcase-settings.reducer';
import { SettingsState } from '../bookcase-settings.reducer';

describe('BOOKCASE_SETTINGS_REDUCER', () => {

  let settings: BookcaseSettings = new BookcaseSettings(1, Privacy.Public.id);

  const initialState: SettingsState = {
    ids: [],
    entities: {},
    processing: false,
    error: undefined
  };

  describe('SET_BOOKCASE_SETTINGS', () => {
    it('should return new state with updated entities property', () => {

      const action = fromActions.SET_BOOKCASE_SETTINGS({ payload: { bookcaseId: 1, settings } })

      const newState = fromRedcuer.settingsReducer(initialState, action);

      expect(newState.entities[action.payload.bookcaseId]).toEqual(settings);
    });
  });

  describe('CHANGE_BOOKCASE_SETTINGS', () => {
    it('should return new state with processing property', () => {

      const action = fromActions.CHANGE_BOOKCASE_SETTINGS({ payload: { bookcase: undefined, settings } })

      const newState = fromRedcuer.settingsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });
});
