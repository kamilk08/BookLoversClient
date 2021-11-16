import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookcase, Shelf } from '../../models';
import { ADD_SHELF_TAG, SELECT_SHELF, SET_BOOK_ID_ON_BOOKCAS_PREVIEW, SELECT_SHELF_TAG, RESET_BOOKCASE_PREVIEW, CHECK_AVAILABLE_SHELVES } from './bookcase-preview.actions';
import { RESET_RATING_FORM, RESET_REVIEW_FORM, SET_NO_REVIEW, SUBMIT_BOOKCASE_PREVIEW_FORM, UPDATE_RATING_FORM, UPDATE_REVIEW_FORM } from './readed-shelf/readed-shelf.actions';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { Book } from 'src/app/modules/api/books/models';

import * as fromModule from './index';
import * as fromSelectors from './module.selectors';



@Injectable()
export class BookcasePreviewFacade {

  public readonly loggedInUserBookcase$ = this.store.select(fromSelectors.bookcasePreview);
  public readonly isProcessingBookcase$ = this.store.select(fromSelectors.isProcessingBookcase);

  public readonly bookId$ = this.store.select(fromSelectors.bookId);

  public readonly reviewForm$ = this.store.select(fromSelectors.reviewForm);
  public readonly ratingForm$ = this.store.select(fromSelectors.ratingForm);

  public readonly hasReview$ = this.store.select(fromSelectors.hasReview);
  public readonly selectedGrade$ = this.store.select(fromSelectors.selectedGrade);
  public readonly oldGrade$ = this.store.select(fromSelectors.oldGrade);

  public readonly avaliableShelves$ = this.store.select(fromSelectors.avaliableShelves);
  public readonly currentShelfTags$ = this.store.select(fromSelectors.currentShelfTags);

  public readonly selectedShelf$ = this.store.select(fromSelectors.selectedShelf);

  public readonly removedShelfTag$ = this.store.select(fromSelectors.removedShelfTag);


  constructor(private store: Store<fromModule.BookcasePreviewState>) { }

  setBookId(bookId: number) {
    this.store.dispatch(SET_BOOK_ID_ON_BOOKCAS_PREVIEW({ payload: { bookId } }));
  }

  addShelfTag(shelf: Shelf) {
    this.store.dispatch(ADD_SHELF_TAG({ payload: { shelf } }));
  }

  selectShelf(shelf: Shelf) {
    this.store.dispatch(SELECT_SHELF({ payload: { shelf } }));
  }

  selectShelfTag(shelfTag: any) {
    this.store.dispatch(SELECT_SHELF_TAG({ payload: { shelfTag } }));
  }

  submitPreivewForm(ratingsOverview: RatingsOverview, book: Book, bookcase: Bookcase) {
    this.store.dispatch(SUBMIT_BOOKCASE_PREVIEW_FORM({ payload: { ratingsOverview, book, bookcase } }));
  }

  updateRatingForm(rating: Rating) {
    this.store.dispatch(UPDATE_RATING_FORM({ payload: { rating } }));
  };

  updateReviewForm(review: Review) {
    this.store.dispatch(UPDATE_REVIEW_FORM({ payload: { review } }));
  }

  resetReviewForm() {
    this.store.dispatch(RESET_REVIEW_FORM());
  };

  resetRatingForm() {
    this.store.dispatch(RESET_RATING_FORM());
  }

  resetBookcasePreview() {
    this.store.dispatch(RESET_BOOKCASE_PREVIEW());
  }

  setNoReview() {
    this.store.dispatch(SET_NO_REVIEW());
  }

  checkAvailableShelves() {
    this.store.dispatch(CHECK_AVAILABLE_SHELVES());
  }
}
