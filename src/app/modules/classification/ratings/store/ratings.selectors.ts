import { createSelector } from '@ngrx/store';
import { ratingsState, RatingsState } from '.';
import { Ratings } from './ratings.reducer';

const state = createSelector(ratingsState, (state: RatingsState) => state.ratings);

export const getUserBookRating = (bookId: number, userId: number) => createSelector(state, (state: Ratings) => {
  if (bookId && userId) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.filter(f => f.bookId === bookId && f.userId === userId)[0];
  }

  return undefined;
})

export const getMultipleUserRatings = (userId: number, bookIds: number[]) => createSelector(state, (state: Ratings) => {
  if (userId && bookIds) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    let ratings = entities.filter(f => f.userId === userId && bookIds.includes(f.bookId));

    return ratings;
  }

  return undefined;
});
