import { createSelector } from '@ngrx/store';
import { ReviewsModuleState, reviewsModuleState } from '..';
import { BookPaginatedReviews } from './reviews-pagination.reducer';

const booksPaginatedReviewsState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.paginatedBookReviews;

  return undefined;
});


export const bookReviewsPageResult = createSelector(booksPaginatedReviewsState, (state: BookPaginatedReviews) => {
  if (state) return state.pageResult;

  return undefined;
});

export const paginatedReviews = createSelector(bookReviewsPageResult, (state) => {
  if (state) {
    return state.items;
  }

  return undefined;
});


export const currentBookReviewsPage = createSelector(bookReviewsPageResult, (state) => {
  if (state) return state.page + 1;

  return undefined;
});

export const bookReviewsTotalCount = createSelector(bookReviewsPageResult, (state) => {
  if (state) return state.totalItems;

  return undefined;
})


export const processingBookNextPage = createSelector(booksPaginatedReviewsState, (state: BookPaginatedReviews) => {
  if (state) return state.processing;

  return undefined;
});
