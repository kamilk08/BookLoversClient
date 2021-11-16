import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ProfileApi } from 'src/app/modules/api/profiles/profile.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { EditProfileModel } from '../../../../api/profiles/models/edit-proflie.model';
import { UPDATE_PROFILE } from '../profile/profile.actions';
import * as fromActions from './change-profile.actions';


@Injectable()
export class ChangeProfileEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ProfileApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  changeProfile$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PROFILE),
      switchMap(action => this.api.changeProfile(new EditProfileModel(action.payload.profile))
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.CHANGE_PROFILE_SUCCESS({ payload: { profile: action.payload.profile } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_PROFILE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } }))),
        ))
    ));

  changeProfileSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PROFILE_SUCCESS),
      switchMap(action => [
        UPDATE_PROFILE({ payload: { profile: action.payload.profile } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Profile changed.😊' } })])
    ));

  changeProfileFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PROFILE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
