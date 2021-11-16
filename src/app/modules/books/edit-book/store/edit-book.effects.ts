import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditBookApi } from '../../../api/books/edit/edit-book.api';
import * as fromActions from './edit-book.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { FETCH_BOOK } from '../../store/book.actions';
import { of } from 'rxjs';
import { EditBookModel } from '../../../api/books/edit/models/edit-book.model';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EditBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: EditBookApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) {
  }

  editBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_BOOK),
      switchMap(action => this.api.editBook(new EditBookModel(action.payload.book, action.payload.cover))
        .pipe(
          switchMap(() => [fromActions.EDIT_BOOK_SUCCESS({ payload: { book: action.payload.book } }),
          FETCH_BOOK({ payload: { book: action.payload.book } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.EDIT_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  editBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_BOOK_SUCCESS),
      map(action => action.payload.book),
      switchMap((book) => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book edited sucessfully.😊' } }),
        MOVE_TO({ payload: { moveTo: { path: [`book/${book.identification.id}`] } } })
      ])
    ));

  editBookFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
