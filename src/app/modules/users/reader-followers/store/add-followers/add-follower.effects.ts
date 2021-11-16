import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FollowersApi } from 'src/app/modules/api/followers/followers.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AddFollower } from '../../../../api/followers/models/add-follower.interface';
import { ADD_FOLLOWER_TO_READER } from '../followers/reader-followers.actions';
import { ADD_FOLLOWING_TO_READER } from '../followings/followings.actions';
import { FETCH_IS_FOLLOWING_STATE } from '../is-following/is-following.actions';
import * as fromActions from './add-follower.actions';

@Injectable()
export class AddFollowerEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FollowersApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  addFollower$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FOLLOWER),
      switchMap(action => this.api.addFollower(new AddFollower(action.payload.followed.identification.guid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.ADD_FOLLOWER_SUCCESS({ payload: { followedId: action.payload.followed.identification.id, followedById: action.payload.followedBy.identification.id } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_FOLLOWER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addFollowerSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FOLLOWER_SUCCESS),
      switchMap(action => [
        ADD_FOLLOWER_TO_READER({ payload: { followedId: action.payload.followedId, followedById: action.payload.followedById } }),
        ADD_FOLLOWING_TO_READER({ payload: { followedById: action.payload.followedById, followedObjectId: action.payload.followedId } }),
        FETCH_IS_FOLLOWING_STATE({ payload: { followedId: action.payload.followedId, flag: true } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'User followed succsesfully.😊' } })])
    ));

  addFollowerFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FOLLOWER_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
