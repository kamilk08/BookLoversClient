import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ADD_OR_UPDATE_BOOKCASE } from '../../../store/bookcases/bookcase.actions';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from '../../store/bookcase-preview.actions';
import { AddShelfResponse } from '../../../../api/bookcases/api/responses/add-shelf.response';
import { AddCustomShelf } from '../../../../api/bookcases/api/models/add-custom-shelf.model';
import * as fromActions from './add-custom-shelf.actions';
import { AddShelfFacade } from './add-custom-shelf.facade';
import { BookcaseApi } from 'src/app/modules/api/bookcases/api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AddCustomShelfEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookcaseApi,
    private readonly facade: AddShelfFacade,
    private readonly errorActions: ErrorActions,
    private readonly errorsAdapter: ApiErrorAdapter
  ) { }

  addShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CUSTOM_SHELF),
      map(action => { return { bookcase: action.payload.bookcase, shelf: action.payload.shelf } }),
      switchMap(stream => this.api.addShelf(new AddCustomShelf(stream.bookcase.identification.guid, stream.shelf.identification.guid, stream.shelf.name))
        .pipe(
          switchMap((response: AddShelfResponse) => [fromActions.ADD_CUSTOM_SHELF_SUCCESS({ payload: { bookcase: stream.bookcase, shelfResponse: response } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_CUSTOM_SHELF_FALIURE({ payload: { model: this.errorsAdapter.adapt(response) } })))
        ))
    ));

  addShelfSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CUSTOM_SHELF_SUCCESS),
      withLatestFrom(this.facade.addedShelf$),
      map(stream => { return { bookcase: stream[0].payload.bookcase, shelf: stream[1] } }),
      tap(stream => stream.bookcase.addShelf(stream.shelf)),
      switchMap(stream => [
        ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase: stream.bookcase } }),
        ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase: stream.bookcase } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf added succesfully.😊' } })])
    ));

  addShelfFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CUSTOM_SHELF_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
