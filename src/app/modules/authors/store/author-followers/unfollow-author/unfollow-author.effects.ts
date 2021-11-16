import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthorFollowersApi } from 'src/app/modules/api/authors/author-followers/author-followers.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ADD_OR_UPDATE_AUTHOR } from '../../authors/author.actions';
import * as fromActions from './unfollow-author.actions';

@Injectable()
export class UnFollowAuthorEffects {


  constructor(private readonly actions$: Actions,
    private readonly api: AuthorFollowersApi,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  unFollowAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UNFOLLOW_AUTHOR),
      switchMap(action => this.api.unFollowAuthor(action.payload.author.identification.guid)
        .pipe(
          switchMap(() => [fromActions.UNFOLLOW_AUTHOR_SUCCESS(),
          ADD_OR_UPDATE_AUTHOR({ payload: { author: action.payload.author, authorId: action.payload.author.identification.id } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.UNFOLLOW_AUTHOR_FALIURE({
            payload:
              { author: action.payload.author, userId: action.payload.userId, model: this.errorsAdapter.adapt(response.error) }
          }))
          ))
      )));

  unFollowAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNFOLLOW_AUTHOR_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author unfollowed 😊' } })])
    ));

  unFollowAuthorFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNFOLLOW_AUTHOR_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
