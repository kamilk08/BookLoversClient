import { createSelector } from '@ngrx/store';
import { reviewsModuleState, ReviewsModuleState } from '..';
import { ReviewsState } from './review.reducer';

const reviews = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.reviews;

  return undefined;
});

export const getUserBookReview = (userId: number, bookId: number) => createSelector(reviews, (state: ReviewsState) => {
  if (state && userId && bookId) {
    let entities = state.ids.map(id => state.entities[id]);
    const review = entities.find(p => p.reviewedBook.bookId === bookId
      && p.reviewedBy.userId === userId);
    return review;
  }

  return undefined;
});

export const getBookReviews = (bookId: number, count?: number) => createSelector(reviews, (state: ReviewsState) => {
  if (state && bookId) {
    return state.ids.map(id => state.entities[id]).take(count).filter(f => f !== undefined);
  };

  return undefined;
});

export const getBookReviewsWithoutReader = (bookId: number, readerId: number, count: number) => createSelector(reviews, (state: ReviewsState) => {
  if (state && bookId && readerId) {
    let entities = state.ids.map(id => state.entities[id]);
    entities = entities.take(count).filter(p => p.reviewedBy.userId !== readerId);

    return entities;
  }

  return undefined;
});
