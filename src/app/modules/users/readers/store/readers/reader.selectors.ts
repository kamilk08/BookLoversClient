import { createSelector } from '@ngrx/store';
import { ReadersState } from './reader.reducer';
import { UUID } from 'angular2-uuid';
import { readersModuleState, ReadersModuleState } from '..';


//READERS_STATE
const readersState = createSelector(readersModuleState, (state: ReadersModuleState) => {
  if (state) return state.readers;

  return undefined;
});
export const reader = (readerId: number) => createSelector(readersState, (state: ReadersState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const readerByGuid = (guid: UUID) => createSelector(readersState, (state: ReadersState) => {
  if (state && guid) {
    const entities = state.ids.map(id => state.entities[id]);
    return entities.find(f => f.identification.guid === guid);
  }
  return undefined;
});

export const multipleReaders = (ids: number[]) => createSelector(readersState, (state: ReadersState) => {
  if (state && ids) {
    const entities = ids.map(id => state.entities[id]);
    return entities;
  }
  return undefined;
});


export const readerUserName = (readerId: number) => createSelector(reader(readerId), (state) => {
  if (state) return state.details.userName

  return undefined;
});

export const role = (readerId: number) => createSelector(reader(readerId), (state) => {
  if (state) return state.details.role;

  return undefined;
});

export const joinedAt = (readerId: number) => createSelector(reader(readerId), (state) => {
  if (state) return state.details.joinedAt;

  return undefined;
})

