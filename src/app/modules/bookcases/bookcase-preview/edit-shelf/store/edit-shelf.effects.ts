import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditShelfFacade } from './edit-shelf.facade';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EditShelfName } from '../../../../api/bookcases/api/models/edit-shelf-name.model';
import { of } from 'rxjs';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { Bookcase } from '../../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

import * as fromActions from './edit-shelf.actions';
@Injectable()
export class EditShelfEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: EditShelfFacade,
    private readonly api: BookcaseApi,
    private readonly errorsAdapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions) {

  }

  editShelfName$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_CUSTOM_SHELF_NAME),
      switchMap(action => this.api.editShelfsName(new EditShelfName(action.payload.bookcase.identification.guid, action.payload.shelf.identification.guid, action.payload.shelfName))
        .pipe(
          switchMap(() => [fromActions.EDIT_CUSOTM_SHELF_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.EDIT_CUSTOM_SHELF_NAME_FALIURE({ payload: { model: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  editCustomShelfNameSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_CUSOTM_SHELF_SUCCESS),
      withLatestFrom(this.facade.editedShelf$, this.facade.shelfName$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, shelf: stream[1], shelfName: stream[2] } }),
      tap(stream => this.changeShelfName(stream.bookcase, stream.shelf.identification.id, stream.shelfName)),
      map(stream => stream.bookcase),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf edited succesfully.😊' } })
      ])
    ));

  editCustomShelfNameFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_CUSTOM_SHELF_NAME_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

  private changeShelfName(bookcase: Bookcase, shelfId: number, shelfName: string) {
    const shelf = bookcase.getShelf(shelfId);
    shelf.changeShelfName(shelfName);
  }
}
