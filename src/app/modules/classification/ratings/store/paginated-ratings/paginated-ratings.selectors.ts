import { createSelector } from '@ngrx/store';
import { RatingsState, ratingsState } from '..';
import { PaginatedRatings } from './paginated-ratings.reducer';

const userPaginatedRatings = createSelector(ratingsState, (state: RatingsState) => {
  if (state) return state.paginatedRatings;

  return undefined;
});

export const paginatedRatings = createSelector(userPaginatedRatings, (state: PaginatedRatings) => {
  if (state) return state.entities;

  return undefined;
});

export const pageResult = createSelector(userPaginatedRatings, (state: PaginatedRatings) => {
  if (state) return state.pageResult;

  return undefined;
});
