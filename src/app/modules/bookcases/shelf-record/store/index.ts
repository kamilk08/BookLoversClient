import { ShelfRecords, shelfRecordReducer } from './shelf-record.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface ShelfRecordState {
  shelfRecords: ShelfRecords
}

const reducersMap: ActionReducerMap<ShelfRecordState> = {
  shelfRecords: shelfRecordReducer
}

const reducer = combineReducers(reducersMap);


export function shelfRecordModuleReducer(state: ShelfRecordState, action: Action) {
  return reducer(state, action);
}

export const shelfRecordsState = createFeatureSelector('shelfRecords');
