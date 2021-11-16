import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import * as fromActions from './is-following.actions';

@Injectable()
export class IsFollowingEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FollowersApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  isFollowing$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.IS_FOLLOWING),
      switchMap((action) => this.api.isFollowing(action.payload.followedId)
        .pipe(
          switchMap((response: boolean) => [fromActions.FETCH_IS_FOLLOWING_STATE({ payload: { followedId: action.payload.followedId, flag: response } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_IS_FOLLOWING_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchIsFollowingFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_IS_FOLLOWING_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
