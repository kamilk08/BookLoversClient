import { createSelector } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { AuthorsModuleState, authorsModuleState } from '..';
import { AuthorsState } from './author.reducer';


const authorsState = createSelector(authorsModuleState, (state: AuthorsModuleState) => {
  if (state) return state.authors;

  return undefined;
});

export const authorById = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    return state.entities[authorId];
  }

  return undefined;
});

export const authorByGuid = (authorGuid: UUID) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorGuid) {
    const authors = state.ids.map(id => state.entities[id]);
    return authors.find(f => f.identification.guid === authorGuid);
  }

  return undefined;
})

export const multipleAuthors = (authorIds: number[]) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorIds) {
    return state.ids.filter(id => authorIds.includes(id))
      .map(id => state.entities[id])
      .filter(f => f !== undefined);
  }

  return undefined;
});

export const multipleAuthorsByGuid = (authorGuids: UUID[]) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorGuids) {
    const entities = state.ids.map(id => state.entities[id]);
    const filtered = entities.filter(f => authorGuids.filter(a => a === f));
    return filtered;
  }

  return undefined;
})

export const authorBooks = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    const author = state.entities[authorId];
    return author.books;
  }

  return undefined;
});

export const multipleAuthorBooks = (authorIds: number[]) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorIds) {
    let authors = authorIds.map(id => state.entities[id])
      .filter(f => f !== undefined);
    let bookIds = [];
    bookIds = authors.reduce((pv: number[], cv) => [...pv, ...cv.books], [])
      .filter((v, i, arr) => arr.indexOf(v) === i);//only distinct values;

    return bookIds;
  }

  return undefined;
});

export const authorGenres = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state) return state.entities[authorId].genres.map(s => s.name)

  return undefined;
});

export const hasFollower = (authorId: number, userId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId && userId) {
    return state.entities[authorId].hasFollower(userId);
  }

  return undefined;
});

export const hasBirthPlace = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    return state.entities[authorId].details.birthPlace !== null
  }

  return undefined;
});

export const hasSource = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    return state.entities[authorId].description.source !== null
  }

  return undefined;
});

export const hasBirthDate = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    return state.entities[authorId].details.birthDate !== null
  }

  return undefined;
});

export const hasWebSite = (authorId: number) => createSelector(authorsState, (state: AuthorsState) => {
  if (state && authorId) {
    const author = state.entities[authorId];

    return author.description.website !== null && author.description.website !== '';
  }

  return undefined;
});

export const isProcessing = createSelector(authorsState, (state: AuthorsState) => {
  if (state) return state.processing;

  return undefined;
});

export const error = createSelector(authorsState, (state: AuthorsState) => {
  if (state) return state.error;

  return undefined;
})



