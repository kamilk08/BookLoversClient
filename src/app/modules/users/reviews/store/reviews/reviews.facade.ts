import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { REMOVE_FROM_CURRENT_REVIEWS, SELECT_REVIEW } from './review.actions';
import { ReportReview } from '../../../../api/reviews/models/report-review.model';
import { Review } from '../../../../api/reviews/models/review.model';
import { ADD_REVIEW } from '../add-review/add-review-actions';
import { EDIT_REVIEW } from '../edit-review/edit-review.actions';
import { REMOVE_REVIEW } from '../remove-reviews/remove-review.actions';
import { REPORT_REVIEW } from '../report-review/report-review.actions';
import { LIKE_REVIEW, UNLIKE_REVIEW } from '../review-likes/review-likes.actions';
import { ADD_SPOILER_TAG, REMOVE_SPOILER_TAG } from '../review-spoilers/review-spoiler.actions';

import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';


@Injectable()
export class ReviewsFacade {

  public readonly userBookReview$ = (userId: number, bookId: number) => this.store.select(fromSelectors.getUserBookReview(userId, bookId));
  public readonly bookReviews$ = (bookId: number) => this.store.select(fromSelectors.getBookReviews(bookId));
  public readonly bookReviewsWithoutReader$ = (bookId: number, readerId: number, count: number) => this.store.select(fromSelectors.getBookReviewsWithoutReader(bookId, readerId, count));

  public readonly isReviewAddedSuccessfully$ = this.store.select(fromSelectors.isAddedSuccessfully);

  public readonly likedReview$ = this.store.select(fromSelectors.likedReview);
  public readonly unlikedReview$ = this.store.select(fromSelectors.unlikedReview);

  public readonly reportedReview$ = this.store.select(fromSelectors.reportedReview);
  public readonly reviewSpoiler$ = this.store.select(fromSelectors.reviewMakredAsSpoiler);

  constructor(private store: Store<fromModule.ReviewsModuleState>) { }

  selectReview(readerId: number, bookId: number) {
    this.store.dispatch(SELECT_REVIEW({ payload: { readerId, bookId } }));
  }

  addReview(review: Review) {
    this.store.dispatch(ADD_REVIEW({ payload: { review } }));
  }

  removeReview(review: Review) {
    this.store.dispatch(REMOVE_REVIEW({ payload: { review } }));
  }

  removeCurrentReview(review: Review) {
    this.store.dispatch(REMOVE_FROM_CURRENT_REVIEWS({ payload: { review } }));
  }

  changeReview(review: Review) {
    this.store.dispatch(EDIT_REVIEW({ payload: { review } }));
  }

  likeReview(review: Review, readerId: number) {
    this.store.dispatch(LIKE_REVIEW({ payload: { review, userId: readerId } }));
  }

  unlikeReview(review: Review, readerId: number) {
    this.store.dispatch(UNLIKE_REVIEW({ payload: { review, userId: readerId } }))
  }

  addSpoilerTag(review: Review, readerId: number) {
    this.store.dispatch(ADD_SPOILER_TAG({ payload: { review, userId: readerId } }));
  }

  removeSpoilerTag(review: Review, readerId: number) {
    this.store.dispatch(REMOVE_SPOILER_TAG({ payload: { review, userId: readerId } }));
  }

  reportReview(review: Review, userId: number) {
    const reportReview = new ReportReview(review.identification.guid, 1);
    this.store.dispatch(REPORT_REVIEW({ payload: { review, userId, reportReview } }));
  }
}
