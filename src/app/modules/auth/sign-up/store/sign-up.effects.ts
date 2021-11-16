import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as fromActions from './sign-up.actions';
import { of } from 'rxjs';
import { SignUpApi } from '../../../api/auth/sign-up/sign-up.api';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class SignUpEffects {

  private verifyAccountUrl: string = 'verify_account'

  constructor(
    private readonly actions$: Actions,
    private readonly api: SignUpApi,
    public readonly errorActions: ErrorActions,
    private readonly errorsAdapter: ApiErrorAdapter
  ) { }


  signUp$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_UP),
      switchMap(action => this.api.signUp(action.payload.signUpModel)
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.SIGN_UP_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.SIGN_UP_FALIURE({ payload: { error: this.errorsAdapter.adapt(response.error) } })))
        )
      )));

  signUpSucces$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_UP_SUCCESS),
      switchMap(() => [MOVE_TO({ payload: { moveTo: { path: [this.verifyAccountUrl] } } })])
    ));

  signUpFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_UP_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false });

}
