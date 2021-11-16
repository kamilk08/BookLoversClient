
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromReviews from './reviews/review.reducer';
import * as fromReviewLikes from './review-likes/review-likes.reducer';
import * as fromReviewReports from './report-review/report-review.reducer';
import * as fromAddReview from './add-review/add-review.reducer';
import * as fromEditReview from './edit-review/edit-review.reducer';
import * as fromReviewSpoilers from './review-spoilers/review-spoiler.reducer';
import * as fromReviewsPage from './reviews-page/reviews-page.reducer';
import * as fromRemoveReviews from './remove-reviews/remove-review.reducer';
import * as fromBookReviewsPagination from './book-reviews/reviews-pagination.reducer';
import * as fromReaderReviewsPagination from './reader-reviews/reader-reviews-pagination.reducer';

export interface ReviewsModuleState {
  addReview: fromAddReview.AddReviewState,
  editReview: fromEditReview.EditReviewState,
  reviewLikes: fromReviewLikes.ReviewLikesState,
  reviewReports: fromReviewReports.ReportReviewState,
  reviewSpoilers: fromReviewSpoilers.ReviewSpoilersState,
  reviews: fromReviews.ReviewsState,
  reviewsPage: fromReviewsPage.ReviewsPageState,
  removeReviews: fromRemoveReviews.RemoveReviewState,
  paginatedBookReviews: fromBookReviewsPagination.BookPaginatedReviews,
  paginatedReaderReviews: fromReaderReviewsPagination.ReaderPaginatedReviewsState
}

const reducerMap: ActionReducerMap<ReviewsModuleState> = {
  addReview: fromAddReview.addReviewReducer,
  editReview: fromEditReview.editReviewReducer,
  reviewLikes: fromReviewLikes.reviewLikesReducer,
  reviewReports: fromReviewReports.reporReviewReducer,
  reviewSpoilers: fromReviewSpoilers.reviewSpoilersReducer,
  reviews: fromReviews.reviewsReducer,
  reviewsPage: fromReviewsPage.reviewsPageReducer,
  removeReviews: fromRemoveReviews.removeReviewReducer,
  paginatedBookReviews: fromBookReviewsPagination.paginatedReviewsReducer,
  paginatedReaderReviews: fromReaderReviewsPagination.readerReviewsPaginationReducer
}

const reducer = combineReducers(reducerMap);

export function reviewsStateReducer(state: ReviewsModuleState, action: Action) {
  return reducer(state, action);
}

export const reviewsModuleState = createFeatureSelector('reviews');
