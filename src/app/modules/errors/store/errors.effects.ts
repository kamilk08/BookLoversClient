import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { MOVE_TO } from '../../router/state/router.actions';
import * as fromActions from './errors.actions';

@Injectable()
export class ErrorsEffects {

  constructor(private readonly actions$: Actions) { }

  unAuthorizedError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.THROW_UNAUTHORIZED_ERROR),
      map(() => MOVE_TO({ payload: { moveTo: { path: ['/sign_in'] } } }))
    ));

  forbiddenError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.THROW_FORBIDDEN_ERROR),
      map(() => MOVE_TO({ payload: { moveTo: { path: ['/forbidden'] } } }))
    ));

  notFoundError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.THROW_NOT_FOUND_ERROR),
      map(() => MOVE_TO({ payload: { moveTo: { path: ['/not_found'] } } }))
    ))
}
