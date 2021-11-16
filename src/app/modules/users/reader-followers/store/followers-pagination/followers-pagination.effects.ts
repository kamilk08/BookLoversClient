import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError, map, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FollowersApi } from 'src/app/modules/api/followers/followers.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { Follower } from 'src/app/modules/shared';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { FETCH_READER_FOLLOWERS } from '../followers/reader-followers.actions';
import * as fromActions from './followers-pagination.actions';

@Injectable()
export class FollowersPaginationEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: FollowersApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  selectReaderFollowers$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_FOLLOWERS_PAGE),
      mergeMap(action => this.api.getFollowersPage(action.payload.readerId, action.payload.query)
        .pipe(
          map(pageResult => { return { page: pageResult, followers: this.getFollowersFromPage(pageResult, action.payload.readerId) } }),
          switchMap(stream => [
            fromActions.SET_READER_FOLLOWER_PAGE({ payload: { readerId: action.payload.readerId, pageResult: stream.page } }),
            FETCH_READER_FOLLOWERS({ payload: { readerId: action.payload.readerId, followers: stream.followers } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_READER_FOLLOWERS_PAGE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } }))
          ))
      )));

  setReaderFollowersPageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_FOLLOWERS_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

  private getFollowersFromPage(pageResult: PageResult, readerId: number) {
    return pageResult.items.map(id => new Follower(readerId, id));
  }

}
