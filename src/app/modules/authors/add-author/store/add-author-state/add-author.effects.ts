import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AddAuthorApi } from 'src/app/modules/api/authors/add-author/add-author.api';
import { AddAuthorResponse } from 'src/app/modules/api/authors/add-author/responses/add-author.response';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import * as fromActions from './add-author.actions';

@Injectable()
export class AddAuthorEffects {


  constructor(private readonly actions$: Actions,
    private readonly api: AddAuthorApi,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) { }


  addAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_AUTHOR),
      switchMap(action => this.api.addAuthor(action.payload.model)
        .pipe(
          switchMap((response: AddAuthorResponse) => [fromActions.ADD_AUTHOR_SUCCESS({ payload: { authorId: response.authorWriteModel.authorId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_AUTHOR_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } }))
          ))
      )));

  addAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_AUTHOR_SUCCESS),
      switchMap((action) => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author added succesfully.😊' } }),
        MOVE_TO({ payload: { moveTo: { path: ['author', action.payload.authorId] } } })
      ])
    ));

  addAuthorFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_AUTHOR_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
