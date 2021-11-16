import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './bookcase-settings.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { BookcaseSettingsApi } from 'src/app/modules/api/bookcases/settings/bookcase-settings.api';
import { ChangeSettings } from 'src/app/modules/api/bookcases/settings/models/change-settings.model';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookcaseSettingsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookcaseSettingsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  changeSettings$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOKCASE_SETTINGS),
      switchMap((action) => this.api.changeBookcaseOptions(new ChangeSettings(action.payload.bookcase.identification.guid, action.payload.settings))
        .pipe(
          switchMap(() => [
            fromActions.CHANGE_BOOKCASE_SETTINGS_SUCCESS({ payload: { bookcase: action.payload.bookcase, settings: action.payload.settings } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_BOOKCASE_SETTINGS_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  changeSettingsSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOKCASE_SETTINGS_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Settings were successfully changed 😊' } })])
    ));

  changeSettingsFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOKCASE_SETTINGS_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
