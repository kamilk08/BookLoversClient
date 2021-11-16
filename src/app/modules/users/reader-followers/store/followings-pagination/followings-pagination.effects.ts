import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FollowersApi } from 'src/app/modules/api/followers/followers.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { Follower } from 'src/app/modules/shared';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { FETCH_READER_FOLLOWINGS } from '../followings/followings.actions';
import * as fromActions from './followings-pagination.actions';

@Injectable()
export class FollowingsPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FollowersApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectReaderFollowingsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_FOLLOWINGS_PAGE),
      mergeMap(action => this.api.getFollowingsPage(action.payload.readerId, action.payload.query)
        .pipe(
          switchMap(pageResult => [
            fromActions.SET_READER_FOLLOWINGS_PAGE({ payload: { readerId: action.payload.readerId, pageResult } }),
            FETCH_READER_FOLLOWINGS({ payload: { readerId: action.payload.readerId, followings: this.getFollowingsFromPage(pageResult, action.payload.readerId) } })],
          ),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_READER_FOLLOWINGS_PAGE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  setReaderFollowersPageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_FOLLOWINGS_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

  private getFollowingsFromPage(pageResult: PageResult, readerId: number) {
    return pageResult.items.map(id => new Follower(id, readerId));
  }
}
