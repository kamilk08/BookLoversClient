import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './shelf-record.actions';
import { ShelfRecordApi } from 'src/app/modules/api/bookcases/shelf-records/shelf-records.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ShelfRecordEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ShelfRecordApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectShelfRecord$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SHELF_RECORD),
      mergeMap(action => this.api.getShelfRecord(action.payload.shelfId, action.payload.bookId)
        .pipe(
          map(shelfRecord => fromActions.FETCH_SHELF_RECORD({ payload: { shelfRecord } })),
          catchError((response: HttpErrorResponse) => of(fromActions.SHELF_RECORD_ACTION_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultipleShelfRecords$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SELECT_MULTIPLE_SHELF_RECORDS),
    switchMap(action => this.api.getMultipleShelfRecords(action.payload.bookIds, action.payload.bookcaseId)
      .pipe(
        map(shelfRecords => fromActions.FETCH_MULTIPLE_SHELF_RECORDS({ payload: { shelfRecords } })),
        catchError((response: HttpErrorResponse) => of(fromActions.SHELF_RECORD_ACTION_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
      ))
  ));

  shelfRecordActionsFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SHELF_RECORD_ACTION_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
