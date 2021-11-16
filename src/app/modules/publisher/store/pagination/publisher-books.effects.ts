import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, switchMap, catchError, delay } from "rxjs/operators";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { PublisherApi } from "src/app/modules/api/publishers/publisher.api";
import { DEFAULT_DELAY } from "src/app/modules/shared/common/constants";

import * as fromActions from './publisher-books.actions';

@Injectable()
export class PublisherBooksEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: PublisherApi,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  selectPublisherBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PUBLISHER_BOOKS),
      mergeMap(action => this.api.getPublisherBooks(action.payload.query)
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap(pageResult => [
            fromActions.FETCH_PUBLISHER_BOOKS({ payload: { pageResult: pageResult } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_BOOKS_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        )),
    ));
}
