import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChangeShelfFacade } from './change-shelf.facade';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ChangeShelf } from '../../../../api/bookcases/api/models/change-shelf.model';
import { of } from 'rxjs';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { Bookcase, Shelf } from '../../../models';
import { Book } from 'src/app/modules/api/books/models';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromActions from './change-shelf.actions';

@Injectable()
export class ChangeShelfEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookcaseApi,
    private readonly facade: ChangeShelfFacade,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) { }

  changeShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_SHELF),
      switchMap(action => this.api.changeShelf(new ChangeShelf(action.payload.bookcase.identification.guid, action.payload.shelves, action.payload.book.identification.guid))
        .pipe(
          switchMap(() => [fromActions.CHANGE_SHELF_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_SHELF_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  changeShelfSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_SHELF_SUCCESS),
      withLatestFrom(this.facade.oldShelf$, this.facade.newShelf$, this.facade.book$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, oldShelf: stream[1], newShelf: stream[2], book: stream[3] } }),
      map(stream => this.changeShelves(stream.bookcase, stream.oldShelf, stream.newShelf, stream.book)),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf changed successfully.😊' } })])
    ));

  changeShelfFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_SHELF_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });


  private changeShelves(bookcase: Bookcase, oldShelf: Shelf, newShelf: Shelf, book: Book) {
    bookcase.removeFromShelf(oldShelf.identification.id, book.identification.id);
    bookcase.addToShelf(newShelf.identification.id, book.identification.id);
    return bookcase;
  }
}
