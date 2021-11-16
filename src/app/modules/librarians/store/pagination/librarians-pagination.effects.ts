import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { LibrariansApi } from 'src/app/modules/api/librarians/api/librarians.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { FETCH_MULTIPLE_LIBRARIANS } from '../librarian.actions';
import * as fromActions from './librarians-pagination.actions';

@Injectable()
export class LibrariansPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: LibrariansApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {
  }

  selectLibrariansPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_LIBRARIANS_PAGE),
      mergeMap(action => this.api.getLibrariansPage(action.payload.ids, action.payload.page, action.payload.count)
        .pipe(
          switchMap(action => [
            fromActions.FETCH_LIBRARIANS_PAGE({ payload: { pageResult: action.pageResult } }),
            FETCH_MULTIPLE_LIBRARIANS({ payload: { librarians: action.librarians } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.SELECT_LIBRARIANS_PAGE_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectLibrariansPageError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_LIBRARIANS_PAGE_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
