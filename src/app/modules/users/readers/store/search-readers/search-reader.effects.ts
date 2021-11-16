import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReadersApi } from 'src/app/modules/api/readers/readers.api';
import { SHOW_FALIURE_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { FETCH_MULTIPLE_READERS } from '../readers/reader.actions';
import * as fromActions from './search-reader.actions';

@Injectable()
export class SearchReaderEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReadersApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  searchReader$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SEARCH_READERS),
      switchMap(action => this.api.searchReaders(action.payload.query)
        .pipe(
          switchMap(response => [fromActions.SET_READERS_PAGE({ payload: { pageResult: response.pageResult } }),
          FETCH_MULTIPLE_READERS({ payload: { readers: response.readers } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SEARCH_READERS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  searchReadersFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SEARCH_READERS_FALIURE),
      switchMap(() => [SHOW_FALIURE_MESSAGE({ payload: { message: 'Something went wrong.😟' } })])
    ))

}
