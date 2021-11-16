import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as searchAction from './search-book.actions';
import { BookApi } from 'src/app/modules/api/books/book.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SearchBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  startFilteringBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchAction.START_FILTERING_BOOKS),
      switchMap(action => this.api.searchBookByTitle(action.payload.query)
        .pipe(
          map((books) => searchAction.FETCH_FILTERED_BOOKS({ payload: { books } })),
          catchError((response: HttpErrorResponse) => of(searchAction.FILTER_BOOK_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));
}
