import { createSelector } from "@ngrx/store";
import { ShelfRecordState, shelfRecordsState } from '.';
import { ShelfRecords } from './shelf-record.reducer';

const state = createSelector(shelfRecordsState, (state: ShelfRecordState) => {
  if (state) return state.shelfRecords;

  return undefined;
});

export const shelfRecord = (shelfId: number, bookId: number) => createSelector(state, (state: ShelfRecords) => {
  if (state && shelfId && bookId) {
    const entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.filter(p => p.bookId == bookId && p.shelfId == shelfId)[0];
  }

  return undefined;
});

export const multipleShelfRecords = (shelfId: number) => createSelector(state, (state: ShelfRecords) => {
  if (state && shelfId) {
    const entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.filter(p => p.shelfId == shelfId);
  }

  return undefined;
});

export const shelfRecordsFrom = (shelfIds: number[]) => createSelector(state, (state: ShelfRecords) => {
  if (state && shelfIds) {
    const entities = state.ids.map(id => state.entities[id]);
    return entities.filter(f => shelfIds.includes(f.shelfId));
  }

  return undefined;
});
