import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './book.actions';
import { Book } from '../../api/books/models';
import { BookApi } from '../../api/books/book.api';
import { ApiErrorAdapter } from '../../api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { BookNotFound } from '../models/book-not-found';
import { ErrorActions } from '../../errors/services/error-actions.service';

@Injectable()
export class BookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectBookById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOK),
      mergeMap(action => this.api.getBookById(action.payload.bookId)
        .pipe(
          map((book: Book) => book !== undefined ? fromActions.FETCH_BOOK({ payload: { book } })
            : fromActions.BOOK_NOT_FOUND({ payload: { model: BookNotFound.withId(action.payload.bookId) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectBookByGuid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOK_BY_GUID),
      mergeMap(action => this.api.getBookByGuid(action.payload.guid)
        .pipe(
          map((book: Book) => book !== undefined ? fromActions.FETCH_BOOK({ payload: { book } })
            : fromActions.BOOK_NOT_FOUND({ payload: { model: BookNotFound.withGuid(action.payload.guid.toString()) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  selectMultipleBooksById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MUTLTIPLE_BOOKS_BY_ID),
      mergeMap(action => this.api.getBooksByIds(action.payload.bookIds)
        .pipe(
          map((books: Book[]) => fromActions.FETCH_MULTIPLE_BOOKS({ payload: { books } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultipleBooksByGuid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MULTIPLE_BOOKS_BY_GUID),
      mergeMap(action => this.api.getBooksByGuids(action.payload.guids)
        .pipe(
          map((books: Book[]) => fromActions.FETCH_MULTIPLE_BOOKS({ payload: { books } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchBookFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))), { dispatch: false });

}
