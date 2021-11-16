import { on, createReducer, Action } from '@ngrx/store';
import * as fromActions from './profile.actions';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { Profile } from '../../../../api/profiles/models/profile.model';

export interface Profiles {
  entities: { [id: number]: Profile },
  ids: number[],
  processing: boolean
  error: any
}

const initialState: Profiles = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PROFILE, (state) => ({ ...state, processing: true })),
  on(fromActions.UPDATE_PROFILE, (state, action) => {
    return { ...state, entities: { ...state.entities, [action.payload.profile.identification.id]: action.payload.profile } }
  }),
  on(fromActions.FETCH_PROFILE, (state, action) => {
    const newState = fetchSingle((p: Profile) => p.identification.id, state, action.payload.profile);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_PROFILE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromActions.PROFILE_NOT_FOUND, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function profileReducer(state: Profiles, action: Action) {
  return reducer(state, action);
}
