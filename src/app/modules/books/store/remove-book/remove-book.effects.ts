import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { RemoveBookApi } from "src/app/modules/api/books/remove/remove-book.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";

import * as fromActions from '../remove-book/remove-book.actions';

@Injectable()
export class RemoveBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RemoveBookApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  removeBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_BOOK),
      map(action => action.payload.book.identification.guid),
      switchMap(guid => this.api.removeBook(guid)
        .pipe(
          switchMap((response) => [fromActions.REMOVE_BOOK_SUCCESS({ payload: { guid } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_BOOK_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book archived sucessfully.😊' } })])
    ));

  removeBookFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })


}
