import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import { ShelfRecord } from '../../../api/bookcases/shelf-records/models/shelf-record.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './shelf-record.actions';

export interface ShelfRecords {
  entities: { [id: number]: ShelfRecord }
  ids: number[]
  processing: boolean
  error: any
}

const initialState: ShelfRecords = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_SHELF_RECORD, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_MULTIPLE_SHELF_RECORDS, state => ({ ...state, processing: false })),
  on(fromActions.FETCH_SHELF_RECORD, (state, action) => {
    const newState = fetchSingle((sr: ShelfRecord) => sr.id, state, action.payload.shelfRecord);
    return { ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_MULTIPLE_SHELF_RECORDS, (state, action) => {
    const newState = fetchMany((sr: ShelfRecord) => sr.id, state, action.payload.shelfRecords);
    return { ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false };
  }),
  on(fromActions.SHELF_RECORD_ACTION_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function shelfRecordReducer(state: ShelfRecords, action: Action) {
  return reducer(state, action);
}
