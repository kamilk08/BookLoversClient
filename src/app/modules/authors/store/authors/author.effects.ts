import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './author.actions';
import { AuthorApi } from 'src/app/modules/api/authors/authors/author.api';
import { AuthorNotFound } from '../../models/author-not-found.model';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';


@Injectable()
export class AuthorEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthorApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_AUTHOR),
      mergeMap(action => this.api.getAuthorById(action.payload.id).pipe(
        map(author => author !== undefined ? fromActions.FETCH_AUTHOR({ payload: { author } })
          : fromActions.AUTHOR_NOT_FOUND({ payload: { model: AuthorNotFound.withId(action.payload.id) } })),
        catchError((response: HttpErrorResponse) => of(fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
      ))
    ));

  selectAuthorByGuid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_AUTHOR_BY_GUID),
      mergeMap(action => this.api.getAuthorByGuid(action.payload.guid)
        .pipe(
          switchMap((author) => author !== undefined ? [fromActions.FETCH_AUTHOR({ payload: { author } })]
            : [fromActions.AUTHOR_NOT_FOUND({ payload: { model: AuthorNotFound.withGuid(action.payload.guid.toString()) } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  selectMultipleAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_MULTIPLE_AUTHORS_BY_IDS),
      switchMap(action => this.api.getMultipleAuthorsById(action.payload.ids)
        .pipe(
          map(authors => fromActions.FETCH_MULTIPLE_AUTHORS({ payload: { authors } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultipleAuthorsByGuids$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MULTIPLE_AUTHORS_BY_GUIDS),
      switchMap(action => this.api.getMultipleAuthorsByGuid(action.payload.guids)
        .pipe(
          map(authors => fromActions.FETCH_MULTIPLE_AUTHORS({ payload: { authors } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  authorNotFound$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.AUTHOR_NOT_FOUND),
      tap(action => this.errorActions.reactToApiError(ApiError.notFound()))
    ), { dispatch: false })

  fetchAuthorFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_AUTHOR_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
