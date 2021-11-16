import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_PAGINATED_USER_RATINGS } from './paginated-ratings.actions';
import { Query } from 'src/app/modules/shared/common/query';

import * as fromModule from '../index';
import * as fromSelectors from '../paginated-ratings/paginated-ratings.selectors';


@Injectable()
export class PaginatedRatingsFacade {

  public paginatedRatings$ = this.store.select(fromSelectors.paginatedRatings);
  public pageResult$ = this.store.select(fromSelectors.pageResult);

  constructor(private store: Store<fromModule.RatingsState>) { }

  selectPaginatedUserRatings(userId: number, query: Query) {
    this.store.dispatch(SELECT_PAGINATED_USER_RATINGS({ payload: { userId, query } }));
  }
}
