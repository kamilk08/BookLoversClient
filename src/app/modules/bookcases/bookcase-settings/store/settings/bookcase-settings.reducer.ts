import * as bookcaseSettingsAction from './bookcase-settings.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { BookcaseSettings } from '../../models/bookcase-settings.model';
import { ApiError } from 'src/app/modules/api/api-error.model';


export interface SettingsState {
  ids: number[],
  entities: { [id: number]: BookcaseSettings }
  processing: boolean,
  error: ApiError
}

const initialState: SettingsState = {
  ids: [],
  entities: {},
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(bookcaseSettingsAction.SET_BOOKCASE_SETTINGS, (state, action) => {
    const ids = state.ids;
    ids.push(action.payload.bookcaseId);

    return { ...state, ids: ids, entities: { ...state.entities, [action.payload.bookcaseId]: action.payload.settings } }
  }),
  on(bookcaseSettingsAction.CHANGE_BOOKCASE_SETTINGS, (state) => {
    return { ...state, processing: true }
  }),
  on(bookcaseSettingsAction.CHANGE_BOOKCASE_SETTINGS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  }),
  on(bookcaseSettingsAction.CHANGE_BOOKCASE_SETTINGS_SUCCESS, (state, action) => {
    let settings = state.entities[action.payload.bookcase.identification.id];

    settings = new BookcaseSettings(action.payload.settings.shelfCapacity, action.payload.settings.privacy);

    return { ...state, entities: { ...state.entities, [action.payload.bookcase.identification.id]: settings }, processing: false }
  })
)

export function settingsReducer(state: SettingsState, action: Action) {
  return reducer(state, action);
}
