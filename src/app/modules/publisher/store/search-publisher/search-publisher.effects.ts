import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from './search-publisher.actions';
import { PublisherApi } from 'src/app/modules/api/publishers/publisher.api';
import { SHOW_FALIURE_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class SearchPublisherEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: PublisherApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  startFilteringPublisher$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.START_FILTERING_PUBLISHERS),
    switchMap(action => this.api.findPublisher(action.payload.query)
      .pipe(
        map(publishers => fromActions.FETCH_FILTERED_PUBLISHERS({ payload: { publishers } })),
        catchError((response: HttpErrorResponse) => of(fromActions.FILTER_PUBLISHER_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
      ))
  ));

  filterPublisherFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FILTER_PUBLISHER_FALIURE),
      switchMap(() => [SHOW_FALIURE_MESSAGE({ payload: { message: 'Something went wrong.😔' } })])
    ))
}
