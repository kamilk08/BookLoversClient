import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SET_BOOKCASE_TO_MANAGE } from '../../bookcase-preview/store/bookcase-preview.actions';
import * as fromActions from './bookcase.actions';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { SET_BOOKCASE_SETTINGS } from '../../bookcase-settings/store/settings/bookcase-settings.actions';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { BookcaseNotFound } from '../../models/bookcase-not-found';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';

@Injectable()
export class BookcaseEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: BookcaseApi,
    private readonly authService: AuthService,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectBookcase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOKCASE),
      switchMap(action => this.api.getBookcaseById(action.payload.id)
        .pipe(
          switchMap(bookcase => [
            bookcase !== undefined ? fromActions.FETCH_BOOKCASE({ payload: { bookcase } })
              : fromActions.BOOKCASE_NOT_FOUND({ payload: { model: new BookcaseNotFound() } }),
            SET_BOOKCASE_TO_MANAGE({ payload: { bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BOOKCASE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectUserBookcase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_USER_BOOKCASE),
      switchMap(action => this.api.getBookcaseByUserId(action.payload.userId)
        .pipe(
          switchMap(bookcase => bookcase !== undefined ? [
            fromActions.FETCH_BOOKCASE({ payload: { bookcase } }),
            SET_BOOKCASE_SETTINGS({ payload: { bookcaseId: bookcase.identification.id, settings: bookcase.settings } }),
            SET_BOOKCASE_TO_MANAGE({ payload: { bookcase } })
          ] : [fromActions.BOOKCASE_NOT_FOUND({ payload: { model: new BookcaseNotFound() } })]),
          catchError(((response: HttpErrorResponse) => of(fromActions.FETCH_BOOKCASE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
          ))
      )));

  selectCurrentUserBookcase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_CURRENT_USER_BOOKCASE),
      switchMap(action => this.api.getBookcaseByUserId(this.authService.userId)
        .pipe(
          switchMap(bookcase => bookcase !== undefined ? [
            fromActions.FETCH_BOOKCASE({ payload: { bookcase } }),
            SET_BOOKCASE_SETTINGS({ payload: { bookcaseId: bookcase.identification.id, settings: bookcase.settings } }),
            SET_BOOKCASE_TO_MANAGE({ payload: { bookcase } })] : [fromActions.BOOKCASE_NOT_FOUND({ payload: { model: new BookcaseNotFound() } })]),
          catchError((response: HttpErrorResponse) => {
            return of(fromActions.FETCH_BOOKCASE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } }))
          })
        ))
    ));

  bookcaseNotFound$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOKCASE_NOT_FOUND),
      tap(action => this.errorActions.reactToApiError(ApiError.notFound()))
    ), { dispatch: false })

  fetchBookcaseFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_BOOKCASE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
