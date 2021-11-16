import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { AddToBookcase } from '../../../../api/bookcases/api/models/add-book-to-bookcase.model';
import * as fromActions from './add-book-to-shelf.actions';
import { AddBookToShelfFacade } from './add-book-to-shelf.facade';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AddBookToShelfEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: BookcaseApi,
    private readonly facade: AddBookToShelfFacade,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) {

  }

  addBookToShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_BOOK_TO_SHELF),
      switchMap(action => this.api.addBookToBookcase(new AddToBookcase(action.payload.book.identification.guid, action.payload.bookcase.identification.guid, action.payload.shelf.identification.guid))
        .pipe(
          switchMap(() => [fromActions.ADD_BOOK_TO_SHELF_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_BOOK_TO_SHELF_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  addBookToShelfSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_BOOK_TO_SHELF_SUCCESS),
      withLatestFrom(this.facade.shelf$, this.facade.book$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, shelf: stream[1], book: stream[2] } }),
      tap(stream => stream.bookcase.addToShelf(stream.shelf.identification.id, stream.book.identification.id)),
      map(stream => stream.bookcase),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book added successfully.😊' } })])
    ));

  addBookToShelfFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_BOOK_TO_SHELF_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
