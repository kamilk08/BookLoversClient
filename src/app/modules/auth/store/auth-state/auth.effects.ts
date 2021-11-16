import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserAdapter } from '../../../api/auth/user.adapter';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import * as fromActions from './auth.actions';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { TokenService } from '../../services/token.service';

@Injectable()
export class AuthenticationEffects {

  constructor(private readonly actions$: Actions,
    private readonly tokenService: TokenService,
    private readonly adapter: UserAdapter) { }

  assignUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ASSIGN_USER),
      map(() => this.adapter.adapt(this.tokenService.getDecodedToken())),
      mergeMap(user => user ? [fromActions.ASSIGN_USER_SUCCESS({ payload: { user } })] :
        [fromActions.ASSIGN_USER_FALIURE({ payload: { error: 'Invalid or missing token' } })])
    ));

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LOGOUT),
      tap(() => this.tokenService.clearTokens()),
      switchMap(() => [fromActions.LOGOUT_SUCCESS()]),
      catchError(error => of(
        fromActions.ASSIGN_USER_FALIURE({ payload: { error } }),
        fromActions.LOGOUT_FALIURE({ payload: { error } })))
    ));

  logoutSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LOGOUT_SUCCESS),
      switchMap(() => [MOVE_TO({ payload: { moveTo: { path: ['sign_in'] } } })])
    ))

}
