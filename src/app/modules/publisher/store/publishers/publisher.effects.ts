import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PublisherApi } from 'src/app/modules/api/publishers/publisher.api';
import * as fromActions from './publisher.actions';
import { PublisherNotFound } from '../../models/publisher-not-found';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';

@Injectable()
export class PublisherEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: PublisherApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectPublisher$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PUBLISHER),
      mergeMap(action => this.api.getPublisherById(action.payload.id)
        .pipe(
          map(publisher => publisher !== undefined ? fromActions.FETCH_PUBLIHSER({ payload: { publisher } })
            : fromActions.PUBLISHER_NOT_FOUND({ payload: { model: PublisherNotFound.withId(action.payload.id) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectPublisherByBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SELECT_PUBLISHER_BY_BOOK),
    mergeMap(action => this.api.getPublisherByBookId(action.payload.bookId)
      .pipe(
        map(publisher => publisher !== undefined ? fromActions.FETCH_PUBLIHSER({ payload: { publisher } }) : fromActions.PUBLISHER_NOT_FOUND({ payload: { model: PublisherNotFound.withBookId(action.payload.bookId) } })),
        catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
      ))
  ));

  publisherNotFound$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.PUBLISHER_NOT_FOUND),
      tap(action => this.errorActions.reactToApiError(ApiError.notFound()))
    ), { dispatch: false })

  fetchPublisherFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_PUBLISHER_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
