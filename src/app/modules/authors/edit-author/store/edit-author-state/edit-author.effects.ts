import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ADD_OR_UPDATE_AUTHOR } from '../../../store/authors/author.actions';
import { EditAuthorApi } from '../../../../api/authors/edit-author/edit-author.api';
import { EditAuthorModel } from '../../../../api/authors/edit-author/models/edit-author.model';
import * as fromActions from './edit-author.actions';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EditAuthorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: EditAuthorApi,
    private readonly authService: AuthService,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) {
  }

  editAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_AUTHOR),
      switchMap(action => this.api.editAuthor(new EditAuthorModel(action.payload.author, action.payload.image, this.authService.userGuid))
        .pipe(
          switchMap(() => [fromActions.EDIT_AUTHOR_SUCCESS(),
          ADD_OR_UPDATE_AUTHOR({ payload: { author: action.payload.author, authorId: action.payload.author.identification.id } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.EDIT_AUTHOR_FALIURE({ payload: { author: action.payload.oldAuthor, model: this.errorsAdapter.adapt(response.error) } }))
          ))
      )))

  editAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_AUTHOR_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author edited succesfully! 😊' } })])
    ));

  editAuthorFailure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_AUTHOR_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
