import { createSelector } from '@ngrx/store';
import { bookcaseModuleState, BookcaseModuleState } from '..';
import { BookcasesState } from './bookcase.reducer';

const bookcasesState = createSelector(bookcaseModuleState, (state: BookcaseModuleState) => {
  if (state) return state.bookcasesState;

  return undefined;
});


export const isProcessing = createSelector(bookcasesState, (state: BookcasesState) => {
  if (state) return state.processing;

  return undefined;
});

export const getBookcaseById = (bookcaseId: number) => createSelector(bookcasesState, (state: BookcasesState) => {
  if (state && bookcaseId) {
    let entities = state.ids.map(id => state.entities[id]);
    const bookcase = entities.find(p => p.identification.id === bookcaseId);
    return bookcase;
  }
  return undefined;
});

export const getBookcaseByUserId = (userId: number) => createSelector(bookcasesState, (state: BookcasesState) => {
  if (state && userId) {
    let entities = state.ids.map(id => state.entities[id]);
    const bookcase = entities.find(p => p.userId === userId);
    return bookcase;
  }

  return undefined;
});

export const bookcaseShelvesCount = (userId: number) => createSelector(getBookcaseByUserId(userId), (state) => {
  if (state) return state.shelfs.length;

  return undefined;
});

export const bookOnShelves = (bookId: number, userId: number) => createSelector(bookcasesState, (state: BookcasesState) => {
  if (state && bookId && userId) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    const bookcase = entities.find(p => p.userId === userId);
    if (bookcase)
      return bookcase.getShelvesWithBook(bookId)
  }

  return undefined;
});

export const error = createSelector(bookcasesState, (state) => {
  if (state) return state.error;

  return undefined;
})

