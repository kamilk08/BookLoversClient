import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ManageLibrarianApi } from 'src/app/modules/api/librarians/api/manage-librarian.api';
import { Librarian } from 'src/app/modules/api/librarians/models/librarian.model';
import { PromotionStatus } from 'src/app/modules/api/librarians/models/promotion-status.model';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { FETCH_LIBRARIAN } from '../../../store/librarian.actions';
import { ManageLibrarianFacade } from '../manage-librarian.facade';
import { UPDATE_PROMOTION_WAITER } from '../promotion-waiters/promotion-waiters.actions';
import * as fromActions from './add-librarian.actions';

@Injectable()
export class AddLibrarianEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: ManageLibrarianFacade,
    private readonly api: ManageLibrarianApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  createLibrarian$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_LIBRARIAN),
      switchMap((action) => this.api.createLibrarian(action.payload.model)
        .pipe(
          switchMap((response) => [
            fromActions.ADD_LIBRARIAN_SUCCESS({ payload: { librarianId: response.librarianId } }),
            SHOW_SUCCESS_MESSAGE({ payload: { message: 'Librarian created succesfully! 😊' } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_LIBRARIAN_FALIURE({ payload: { model: this.adapter.adapt(response.error) } }))
          ))
      )));

  createLibrarianSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_LIBRARIAN_SUCCESS),
      withLatestFrom(this.facade.model$),
      map(stream => {
        return { model: stream[1], action: stream[0] }
      }),
      map(stream => new Librarian({ id: stream.action.payload.librarianId, guid: stream.model.librarianGuid }, stream.model.readerGuid)),
      switchMap((librarian) => [
        FETCH_LIBRARIAN({ payload: { librarian } }),
        UPDATE_PROMOTION_WAITER({ payload: { readerGuid: librarian.readerGuid, status: PromotionStatus.promoted } })
      ])
    ));

  addLibrarianFailure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_LIBRARIAN_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });


}
