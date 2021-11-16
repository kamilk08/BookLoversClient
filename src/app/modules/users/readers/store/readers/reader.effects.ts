import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromActions from './reader.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReadersApi } from 'src/app/modules/api/readers/readers.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ReaderEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReadersApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectReader$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER),
      mergeMap(action => this.api.getReader(action.payload.readerId)
        .pipe(
          map(reader => reader ? fromActions.FETCH_READER({ payload: { reader } }) : fromActions.NO_READER_ACTION()),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectReaderByGuid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_BY_GUID),
      mergeMap(action => this.api.getReaderByGuid(action.payload.guid)
        .pipe(
          map(reader => fromActions.FETCH_READER({ payload: { reader } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchReaderFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_READER_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
