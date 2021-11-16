import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './paginated-ratings.actions';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_MULTIPLE_RATINGS } from '../ratings.actions';
import { RatingsApi } from 'src/app/modules/api/ratings/ratings.api';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class PaginatedRatingsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RatingsApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectUserPaginatedRatings$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PAGINATED_USER_RATINGS),
      switchMap(action => this.api.getUserRatings(action.payload.userId, action.payload.query)
        .pipe(
          switchMap((response) => [
            fromActions.FETCH_PAGINATED_USER_RATINGS({ payload: { ratings: response.items, pageResult: response } }),
            FETCH_MULTIPLE_RATINGS({ payload: { ratings: response.items } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PAGINATED_USER_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));
}
