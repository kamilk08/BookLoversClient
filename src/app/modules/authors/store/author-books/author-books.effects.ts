import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, switchMap, catchError, delay, tap } from "rxjs/operators";
import { AuthorApi } from "src/app/modules/api/authors/authors/author.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { DEFAULT_DELAY } from "src/app/modules/shared/common/constants";

import * as fromActions from './author-books.actions';

@Injectable()
export class AuthorBooksEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthorApi,
    private readonly errorAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  selectAuthorBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_AUTHOR_BOOKS),
      mergeMap(action => this.api.getAuthorBooks(action.payload.query)
        .pipe(
          switchMap((pageResult) => [
            fromActions.FETCH_AUTHOR_BOOKS({ payload: { pageResult } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_AUTHOR_BOOKS_ERROR({ payload: { error: this.errorAdapter.adapt(response.error) } }))),
          delay(DEFAULT_DELAY)
        )),
    ));

  fetchAuthorBooksError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_AUTHOR_BOOKS_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
