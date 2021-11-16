import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as fromActions from './avatar.actions';
import { AvatarApi } from '../../../api/avatars/avatar.api';
import { of } from 'rxjs';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class AvatarEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AvatarApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  changeAvatar$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AVATAR),
      mergeMap(action => this.api.changeAvatar(action.payload.model)
        .pipe(
          map((response: HttpResponse<any>) => fromActions.CHANGE_AVATAR_SUCCESS()),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_AVATAR_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  changeAvatarSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AVATAR_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Avatar changed successfully 😊' } })])
    ));

  changeAvatarFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AVATAR_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
