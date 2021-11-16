import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromShelfActions from './remove-book-from-shelf.actions';
import * as fromBookcaseActions from './remove-book-from-bookcase.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RemoveBookcaseBookFacade } from './remove-bookcase-book.facade';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { RemoveFromBookcase } from '../../../../api/bookcases/api/models/remove-from-bookcase.model';
import { of } from 'rxjs';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { RemoveFromShelf } from 'src/app/modules/api/bookcases/api/models/remove-from-shelf.model';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RemoveBookcaseBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: RemoveBookcaseBookFacade,
    private readonly api: BookcaseApi,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }


  removeBookFromShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromShelfActions.REMOVE_BOOK_FROM_SHELF),
      switchMap(action => this.api.removeFromShelf(new RemoveFromShelf(action.payload.bookcase.identification.guid, action.payload.shelf.identification.guid, action.payload.book.identification.guid))
        .pipe(
          switchMap(() => [fromShelfActions.REMOVE_BOOK_FROM_SHELF_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromShelfActions.REMOVE_BOOK_FROM_SHELF_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  removeBookFromShelfSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromShelfActions.REMOVE_BOOK_FROM_SHELF_SUCCESS),
      withLatestFrom(this.facade.bookRemovedFromShelf$, this.facade.shelfThatContainedBook$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, book: stream[1], shelf: stream[2] } }),
      tap(stream => stream.bookcase.removeFromShelf(stream.shelf.identification.id, stream.book.identification.id)),
      map(stream => stream.bookcase),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } })])
    ));

  removeBookFromShelfFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromShelfActions.REMOVE_BOOK_FROM_SHELF_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

  removeBookFromBookcase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookcaseActions.REMOVE_BOOK_FROM_BOOKCASE),
      switchMap(action => this.api.removeFromBookcase(new RemoveFromBookcase(action.payload.bookcase, action.payload.book))
        .pipe(
          switchMap(() => [fromBookcaseActions.REMOVE_BOOK_FROM_BOOKCASE_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromBookcaseActions.REMOVE_BOOK_FROM_BOOKCASE_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  removeBookFromBookcaseSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookcaseActions.REMOVE_BOOK_FROM_BOOKCASE_SUCCESS),
      withLatestFrom(this.facade.removedBookFromBookcase$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, book: stream[1] } }),
      tap(stream => {
        const shelves = stream.bookcase.getShelvesWithBook(stream.book.identification.id);
        shelves.forEach(shelf => stream.bookcase.removeFromShelf(shelf.identification.id, stream.book.identification.id));
      }),
      map(stream => stream.bookcase),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } })])
    ));

  removeBookFromBookcaseFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookcaseActions.REMOVE_BOOK_FROM_BOOKCASE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
