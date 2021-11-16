import * as fromAction from './reader.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { fetchMany, fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';

export interface ReadersState {
  entities: { [id: number]: Reader },
  ids: number[],
  processing: boolean
  error: any
}

const initialState: ReadersState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.SELECT_READER, (state) => ({ ...state, processing: true })),
  on(fromAction.SELECT_READER_BY_GUID, (state) => ({ ...state, processing: true })),
  on(fromAction.FETCH_READER, (state, action) => {
    const newState = fetchSingle((reader: Reader) => reader.identification.id, state, action.payload.reader);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromAction.FETCH_MULTIPLE_READERS, (state, action) => {
    const newState = fetchMany((reader: Reader) => reader.identification.id, state, action.payload.readers);

    return { ...state, entities: newState.entities, ids: newState.ids }
  }),
  on(fromAction.FETCH_READER_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromAction.NO_READER_ACTION, (state) => ({ ...state }))
);

export function readerReducer(state: ReadersState, action: Action) {
  return reducer(state, action);
}
