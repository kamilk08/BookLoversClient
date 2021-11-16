import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from '../../api/error-adapter';
import { LibrariansApi } from '../../api/librarians/api/librarians.api';
import { ErrorActions } from '../../errors/services/error-actions.service';
import * as fromActions from './librarian.actions';

@Injectable()
export class LibrarianEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: LibrariansApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectLibrarianById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_LIBRARIAN_BY_ID),
      mergeMap(action => this.api.getLibrarianById(action.payload.id)
        .pipe(
          switchMap((librarian) => [fromActions.FETCH_LIBRARIAN({ payload: { librarian } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SELECT_LIBRARIAN_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectLibrarianByGuid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_LIBRARIAN_BY_READER_GUID),
      mergeMap(action => this.api.getLibrarianByGuid(action.payload.guid)
        .pipe(
          switchMap(librarian => [fromActions.FETCH_LIBRARIAN({ payload: { librarian } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SELECT_LIBRARIAN_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectLibrarianError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_LIBRARIAN_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })



}
