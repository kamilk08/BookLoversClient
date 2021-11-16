import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './search-author.actions';
import { AuthorApi } from 'src/app/modules/api/authors/authors/author.api';
import { FETCH_MULTIPLE_AUTHORS } from '../authors/author.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';

@Injectable()
export class SearchAuthorEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthorApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }


  startFiltering$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.START_FILTERING_AUTHORS),
      switchMap(action => this.api.findAuthor(action.payload.query.value, action.payload.query.page, action.payload.query.count)
        .pipe(
          switchMap(authors => [
            fromActions.FETCH_FILTERED_AUTHORS({ payload: { authors } }),
            FETCH_MULTIPLE_AUTHORS({ payload: { authors } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.FILTER_AUTHOR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  ///DELAY IS FOR A SHOWING A SPINNER WHICH INDICATES
  //THAT SEARCH IS IN PROGRESS
  fetchFilteredAuthors$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_FILTERED_AUTHORS),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.STOP_FILTERING_AUTHORS()])
    ));

  filterAuthorFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FILTER_AUTHOR_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
