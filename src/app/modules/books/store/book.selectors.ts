import { createSelector } from '@ngrx/store';
import { Books } from './book.reducer';
import { booksModuleState, BooksModuleState } from '.';
import { UUID } from 'angular2-uuid';

const booksState = createSelector(booksModuleState, (state: BooksModuleState) => {
  if (state) {
    return state.books
  };
  return undefined;
});

export const getBookById = (bookId: number) => createSelector(booksState, (state: Books) => {
  if (state && bookId) {
    return state.entities[bookId];
  }

  return undefined;
});

export const getBookByGuid = (guid: UUID) => createSelector(booksState, (state: Books) => {
  if (state && guid) {
    const entities = state.ids.map(id => state.entities[id]);
    return entities.find(f => f.identification.guid === guid);
  }

  return undefined;
})

export const multipleBooks = (bookIds: number[]) => createSelector(booksState, (state: Books) => {
  if (state && bookIds) {
    return bookIds.map(id => state.entities[id]).filter(b => b !== undefined);
  }

  return undefined;
});

export const bookTitle = (bookId: number) => createSelector(booksState, (state: Books) => {
  if (state && bookId) {
    const book = state.entities[bookId];
    if (book) return book.basics.title;
  }

  return undefined;
})

export const filterBooksByTitle = (phrase: string) => createSelector(booksState, (state: Books) => {
  if (state && phrase) {
    let entities = state.ids.map(id => state.entities[id]);

    entities = entities.filter(f => f.basics.title.toUpperCase().startsWith(phrase.toUpperCase()));
    return entities;
  }

  return undefined;
});

export const isProcessing = createSelector(booksState, (state: Books) => {
  if (state) return state.processing;

  return undefined;
});

export const error = createSelector(booksState, (state: Books) => {
  if (state) return state.error

  return undefined;
})

