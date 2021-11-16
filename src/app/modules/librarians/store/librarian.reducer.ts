import { Action, createReducer, on } from '@ngrx/store';
import { Librarian } from '../../api/librarians/models/librarian.model';
import { fetchMany, fetchSingle, removeEntity } from '../../shared/common/store-extensions';
import * as fromActions from './librarian.actions';

export interface LibrariansState {
  entities: { [id: number]: Librarian },
  ids: number[],
  processing: boolean,
  error: any
}

const initialState: LibrariansState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_LIBRARIAN_BY_ID, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.SELECT_LIBRARIAN_BY_READER_GUID, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.FETCH_LIBRARIAN, (state, action) => {
    const newState = fetchSingle((librarian: Librarian) => librarian.identification.id, state, action.payload.librarian);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_MULTIPLE_LIBRARIANS, (state, action) => {
    const newState = fetchMany((librarian: Librarian) => librarian.identification.id, state, action.payload.librarians);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.REMOVE_LIBRARIAN, (state, action) => {
    const newState = removeEntity(state, action.payload.librarianId);

    return { ...state, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.SELECT_LIBRARIAN_ERROR, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  })
);

export function librariansReducer(state: LibrariansState, action: Action) {
  return reducer(state, action);
}
