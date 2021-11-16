import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAction from './process-book.actions';
import { exhaustMap, catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_BOOK } from '../../store/book.actions';
import { AddNewBook } from '../../../api/books/add/models/add-book.model';
import { AddBookResponse } from '../../../api/books/add/responses/add-book.response';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { AddBookApi } from 'src/app/modules/api/books/add/add-book.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProcessBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AddBookApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  addBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromAction.ADD_BOOK),
      switchMap(action => this.api.addBook(new AddNewBook(action.payload.book, action.payload.cover))
        .pipe(
          tap((response: AddBookResponse) => action.payload.book.setBookId(response.bookId)),
          map(() => action.payload.book),
          switchMap((book) => [fromAction.ADD_BOOK_SUCCESS({ payload: { book } })]),
          catchError((response: HttpErrorResponse) => of(fromAction.ADD_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromAction.ADD_BOOK_SUCCESS),
      map(action => action.payload.book),
      switchMap(book => [
        FETCH_BOOK({ payload: { book } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book created sucessfully.😊' } }),
        MOVE_TO({ payload: { moveTo: { path: [`book/${book.identification.id}`] } } })
      ])
    ));

  addBookFaliure$ = createEffect(() => this.actions$.pipe(
    ofType(fromAction.ADD_BOOK_FALIURE),
    tap(action => this.errorActions.reactToApiError(action.payload.model))
  ), { dispatch: false });
}
