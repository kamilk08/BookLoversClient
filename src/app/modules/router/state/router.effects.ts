import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import * as fromActions from './router.actions';

@Injectable()
export class RouterEffects {

  constructor(private actions$: Actions, private router: Router, private location: Location) {
  }

  moveTo$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.MOVE_TO),
      map(action => action.payload.moveTo),
      tap(moveTo => this.router.navigate(moveTo.path, moveTo.extras))
    ), { dispatch: false })

  back$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BACK),
      tap(() => this.location.back())
    ), { dispatch: false })

  forward$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FORWARD),
      tap(() => this.location.forward())
    ), { dispatch: false })
}
