import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { FETCH_MULTIPLE_BOOKS } from '../../books/store/book.actions';
import { BrowseApi } from '../../api/browse/browse.api';
import * as fromActions from './browse.actions';
import { BrowseCriteria } from '../../api/browse/models/browse-criteria.model';
import { ErrorActions } from '../../errors/services/error-actions.service';
import { ApiErrorAdapter } from '../../api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_DELAY } from '../../shared/common/constants';

@Injectable()
export class BrowseEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BrowseApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter) { }

  browseBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.START_BROWSING),
      map(action => this.mapCriteriaToParams(action.payload.model)),
      switchMap(criteria => this.api.searchBooks(criteria)
        .pipe(
          switchMap((stream) => [
            fromActions.FETCH_BROWSING_RESULTS({ payload: { pageResult: stream.pageResult } }),
            FETCH_MULTIPLE_BOOKS({ payload: { books: stream.books } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BROWSING_RESULTS_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchBrowsingResultsFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_BROWSING_RESULTS_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

  fetchBrowsingResults$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_BROWSING_RESULTS),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.FINISH_BROWSING()])
    ));

  private mapCriteriaToParams(model: BrowseCriteria) {
    let criteria = {
      title: model.title,
      author: model.details.author,
      categories: model.categories,
      isbn: model.details.isbn,
      from: model.details.from ? model.details.from.toDateString() : undefined,
      till: model.details.till ? model.details.till.toDateString() : undefined,
      page: model.pagination.page,
      count: model.pagination.count
    };
    return criteria;
  }

}
