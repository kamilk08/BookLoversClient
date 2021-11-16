import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_GROUPED_RATINGS } from '../store/grouped-ratings/grouped-ratings.actions';
import { SELECT_MULTIPLE_USER_RATINGS, SELECT_RATING } from '../store/ratings.actions';
import { filter, map } from 'rxjs/operators';

import * as fromModule from "../store/index";
import * as fromSelectors from './module.selectors';


@Injectable()
export class RatingsFacade {

  public readonly singleRating$ = (bookId: number, userId: number) => this.store.select(fromSelectors.getUserBookRating(bookId, userId));
  public readonly multipleRatings$ = (userId: number, bookIds: number[]) => this.store.select(fromSelectors.getMultipleUserRatings(userId, bookIds));
  public readonly groupedRatings$ = (bookId: number) => this.store.select(fromSelectors.getBookGroupedRatings(bookId));

  public readonly ratingsStarsCount$ = (bookId: number, numberOfStars: number) => {
    return this.groupedRatings$(bookId).pipe(
      filter(f => f !== undefined),
      map(s => s[numberOfStars] === undefined ? 0 : s[numberOfStars]))
  }

  constructor(private store: Store<fromModule.RatingsState>) { }

  selectGroupedRatings(bookId: number) {
    this.store.dispatch(SELECT_GROUPED_RATINGS({ payload: { bookId } }))
  }

  selectUserRating(userId: number, bookId: number) {
    this.store.dispatch(SELECT_RATING({ payload: { userId, bookId } }))
  }

  selectMultipleUserRatings(userId: number, bookIds: number[]) {
    this.store.dispatch(SELECT_MULTIPLE_USER_RATINGS({ payload: { bookIds, userId } }))
  }


}
