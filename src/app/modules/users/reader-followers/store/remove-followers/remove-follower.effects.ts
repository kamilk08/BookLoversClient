import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FollowersApi } from 'src/app/modules/api/followers/followers.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { RemoveFollower } from '../../../../api/followers/models/remove-follower.interface';
import { REMOVE_FOLLOWER_FROM_READER } from '../followers/reader-followers.actions';
import { REMOVE_FOLLOWING_FROM_READER } from '../followings/followings.actions';
import { FETCH_IS_FOLLOWING_STATE } from '../is-following/is-following.actions';
import * as fromActions from './remove-follower.actions';

@Injectable()
export class RemoveFollowerEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FollowersApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  removeFollower$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FOLLOWER),
      switchMap(action => this.api.removeFollower(new RemoveFollower(action.payload.followed.identification.guid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.REMOVE_FOLLOWER_SUCCESS({
            payload: {
              followedId: action.payload.followed.identification.id,
              followedById: action.payload.followedBy.identification.id
            }
          })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_FOLLOWER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeFollowerSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FOLLOWER_SUCCESS),
      switchMap((action) => [
        REMOVE_FOLLOWER_FROM_READER({
          payload: {
            followedId: action.payload.followedId,
            followedById: action.payload.followedById
          }
        }),
        REMOVE_FOLLOWING_FROM_READER({ payload: { followedById: action.payload.followedById, followedObjectId: action.payload.followedId } }),
        FETCH_IS_FOLLOWING_STATE({ payload: { followedId: action.payload.followedId, flag: false } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'User unfollowed successfully.😊' } })])
    ));

  removeFollowerFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FOLLOWER_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
