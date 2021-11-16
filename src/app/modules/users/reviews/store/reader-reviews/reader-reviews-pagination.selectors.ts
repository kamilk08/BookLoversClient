import { createSelector } from '@ngrx/store';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ReviewsModuleState, reviewsModuleState } from '..';
import { ReaderPaginatedReviewsState } from './reader-reviews-pagination.reducer';

const readerPaginatedReviewsState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.paginatedReaderReviews;

  return undefined;
});

export const readerReviewsPageResult = (readerId: number) => createSelector(readerPaginatedReviewsState, (state: ReaderPaginatedReviewsState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const readerPageResultReviews = (readerId: number) => createSelector(readerReviewsPageResult(readerId), (state) => {
  if (state) return state.items;

  return undefined;
})


export const currentReaderReviewsPage = (readerId: number) => createSelector(readerReviewsPageResult(readerId), (state: PageResult) => {
  if (state) {
    return state.page + 1;
  }

  return undefined;
});

export const readerReviewsTotalCount = (readerId: number) => createSelector(readerReviewsPageResult(readerId), (state: PageResult) => {
  if (state) return state.totalItems;

  return undefined;
});


export const processingReaderReviews = createSelector(readerPaginatedReviewsState, (state: ReaderPaginatedReviewsState) => {
  if (state)
    return state.processing;

  return undefined;
})

