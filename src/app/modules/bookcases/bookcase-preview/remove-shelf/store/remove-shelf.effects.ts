import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RemoveShelfFacade } from './remove-shelf.facade';
import * as fromActions from './remove-shelf.actions';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { RemoveShelf } from '../../../../api/bookcases/api/models/remove-shelf.model';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RemoveShelfEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookcaseApi,
    private readonly facade: RemoveShelfFacade,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  removeShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SHELF),
      switchMap(action => this.api.removeShelf(new RemoveShelf(action.payload.bookcase.identification.guid, action.payload.shelf.identification.guid))
        .pipe(
          switchMap(() => [fromActions.REMOVE_SHELF_SUCCESS({ payload: { bookcase: action.payload.bookcase } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_SHELF_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeShelfSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SHELF_SUCCESS),
      withLatestFrom(this.facade.shelfToRemove$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, shelf: stream[1] } }),
      tap(stream => stream.bookcase.removeShelf(stream.shelf)),
      map(stream => stream.bookcase),
      switchMap((bookcase) => [
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } }),
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf removed succesfully.😊' } })
      ])
    ));

  removeShelfFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SHELF_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
