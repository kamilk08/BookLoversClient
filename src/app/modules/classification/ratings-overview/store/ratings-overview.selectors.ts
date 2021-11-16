import { createSelector } from '@ngrx/store';
import { RatingsOverviews } from './ratings-overview.reducer';
import { ratingOverviewsState, RatingOverviewsState } from '.';

const ratingsOverviewsState = createSelector(ratingOverviewsState, (state: RatingOverviewsState) => {
  if (state) return state.ratingOverviews;

  return undefined;
});

export const getSingleOverview = (bookId: number) => createSelector(ratingsOverviewsState, (state: RatingsOverviews) => {
  if (bookId && state) {
    const entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.find(f => f.book.bookId === bookId);
  }

  return undefined;
})

export const getMultipleOverviews = (bookIds: number[]) => createSelector(ratingsOverviewsState, (state: RatingsOverviews) => {
  if (bookIds && state) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    const ratingOverviews = entities.filter(f => bookIds.includes(f.book.bookId))
    return ratingOverviews;
  }

  return undefined;
});

export const currentBookRating = (bookId: number, userId: number) => createSelector(ratingsOverviewsState, (state: RatingsOverviews) => {
  if (state && bookId) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    const entity = entities.find(f => f.book.bookId === bookId);
    if (entity)
      return entity.getUserRating(userId);
  }

  return undefined;
});

export const allRatings = (bookId: number) => createSelector(getSingleOverview(bookId), (overview) => {
  if (overview && bookId) {
    return overview.ratings.length;
  }
});

export const bookAverage = (bookId: number) => createSelector(getSingleOverview(bookId), (overview) => {
  if (overview) return overview.average;

  return undefined;
});

export const processingRatings = createSelector(ratingsOverviewsState, (state: RatingsOverviews) => {
  if (state) return state.processing

  return undefined;
})






