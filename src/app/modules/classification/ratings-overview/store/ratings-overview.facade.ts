import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { ADD_RATING } from './add-rating/add-rating.actions';
import { EDIT_RATING } from './edit-rating/edit-rating.actions';
import { SELECT_RATINGS_OVEREVIEW, SELECT_MULTIPLE_OVERVIEWS } from './ratings-overview.actions';
import { REMOVE_RATING } from './remove-rating/remove-rating.actions';

import * as fromModule from './index';
import * as fromSelectors from './module.selectors';



@Injectable()
export class RatingsOverviewFacade {

  public readonly singleOverview$ = (bookId: number) => this.store.select(fromSelectors.getSingleOverview(bookId));
  public readonly multipleOverviews$ = (bookIds: number[]) => this.store.select(fromSelectors.getMultipleOverviews(bookIds));
  public readonly currentRating$ = (bookId: number, userId: number) => this.store.select(fromSelectors.currentBookRating(bookId, userId));

  public readonly allRatings$ = (bookId: number) => this.store.select(fromSelectors.allRatings(bookId));
  public readonly bookAverage$ = (bookId: number) => this.store.select(fromSelectors.bookAverage(bookId));

  public readonly addedRating$ = this.store.select(fromSelectors.addedRating);

  public readonly processing$ = this.store.select(fromSelectors.editingRating);
  public readonly newRating$ = this.store.select(fromSelectors.newRating);
  public readonly oldRating$ = this.store.select(fromSelectors.oldRating);

  public readonly removedRating$ = this.store.select(fromSelectors.removedRating);
  public readonly removingRating$ = this.store.select(fromSelectors.removingRating);

  constructor(private store: Store<fromModule.RatingOverviewsState>) { }

  selectRatingOverview(bookId: number) {
    this.store.dispatch(SELECT_RATINGS_OVEREVIEW({ payload: { bookId } }))
  }

  selectMultipleOverviews(bookIds: number[]) {
    this.store.dispatch(SELECT_MULTIPLE_OVERVIEWS({ payload: { bookIds } }));
  }

  addRating(book: { id: number, guid: UUID }, rating: Rating, bookcaseGuid: UUID) {
    this.store.dispatch(ADD_RATING({ payload: { bookcaseGuid, book, rating } }));
  }

  changeRating(overview: RatingsOverview, newRating: Rating) {
    this.store.dispatch(EDIT_RATING({ payload: { book: { id: overview.book.bookId, guid: overview.book.bookGuid }, newRating } }));
  }

  removeRating(overview: RatingsOverview, userId: number) {
    this.store.dispatch(REMOVE_RATING({
      payload: {
        book: { id: overview.book.bookId, guid: overview.book.bookGuid },
        userId
      }
    }));
  }
}

