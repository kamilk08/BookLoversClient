import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { RemoveAuthorApi } from 'src/app/modules/api/authors/remove-author/remove-author.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import * as fromActions from './remove-author.actions';

@Injectable()
export class RemoveAuthorEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RemoveAuthorApi,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  removeAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_AUTHOR),
      switchMap(action => this.api.removeAuthor(action.payload.author.identification.guid)
        .pipe(
          switchMap(() => [fromActions.REMOVE_AUTHOR_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_AUTHOR_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } }))
          ))
      )));

  removeAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_AUTHOR_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author removed succesfully.😊' } })])
    ));

  removeAuthorFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_AUTHOR_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
