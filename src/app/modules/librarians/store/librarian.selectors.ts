import { createSelector } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { librariansModuleState, LibrariansModuleState } from ".";
import { LibrariansState } from './librarian.reducer';

const librariansState = createSelector(librariansModuleState, (state: LibrariansModuleState) => {
  if (state) return state.librarians;

  return undefined;
});

export const getLibrarianById = (id: number) => createSelector(librariansState, (state: LibrariansState) => {
  if (state && id) {
    return state.entities[id];
  }
  return undefined;
});

export const getLibrarianByReaderGuid = (guid: UUID) => createSelector(librariansState, (state: LibrariansState) => {
  if (state && guid) {
    let entities = state.ids.map(id => state.entities[id]);
    return entities.find(f => f.readerGuid === guid);
  }

  return undefined;
});



