import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_READER_RATINGS_STATISTICS } from './ratings-statistics/ratings-statistics.actions';
import { SELECT_READER_STATISTICS } from './reader-statistics/reader-statistics.actions';

import * as fromModule from './index';
import * as fromSelectors from './module.selectors';
import { filter, map } from 'rxjs/operators';
import { ReaderStatistics } from 'src/app/modules/api/statistics/models/reader-statistics.model';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';

@Injectable()
export class ReaderStatisticsFacade {

  public readonly readerStatistics$ = (readerId: number) => this.store.select(fromSelectors.readerStatistics(readerId));
  public readonly readerRatingsStatistics$ = (readerId: number) => this.store.select(fromSelectors.readerRatingsStatistics(readerId));

  public readonly userBooksInBookcase$ = (readerId: number) => this.store.select(fromSelectors.userBooksInBookcase(readerId));
  public readonly shelvesCount$ = (readerId: number) => this.store.select(fromSelectors.userShelves(readerId));
  public readonly reviewsCount$ = (readerId: number) => this.store.select(fromSelectors.userReviews(readerId));
  public readonly givenLikes$ = (readerId: number) => this.store.select(fromSelectors.givenLikes(readerId));
  public readonly addedBooks$ = (readerId: number) => this.store.select(fromSelectors.addedBooks(readerId));
  public readonly addedAuthors$ = (readerId: number) => this.store.select(fromSelectors.addedAuthors(readerId));
  public readonly addedQuotes$ = (readerId: number) => this.store.select(fromSelectors.addedQuotes(readerId));
  public readonly ratingsCount$ = (readerId: number) => this.store.select(fromSelectors.addedRatings(readerId));
  public readonly sumOfFollwersAndFollowings$ = (readerId: number) => this.store.select(fromSelectors.sumOfFollwersAndFollowings(readerId));

  constructor(private store: Store<fromModule.ReaderStatisticsModuleState>) { }

  selectReaderStatistics(readerId: number) {
    this.store.dispatch(SELECT_READER_STATISTICS({ payload: { readerId } }));
  }

  selectReaderRatingsStatistics(readerId: number) {
    this.store.dispatch(SELECT_READER_RATINGS_STATISTICS({ payload: { readerId } }));
  }
}
