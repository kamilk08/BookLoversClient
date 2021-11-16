import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FavouritesApi } from 'src/app/modules/api/profiles/favourites/favourites.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { END_PROCESSING_FAVOURITE } from '../add-favourite/add-favourite.actions';
import * as fromActions from './favourite-books.actions';

@Injectable()
export class FavouriteBooksEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FavouritesApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  selectFavouriteBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_FAVOURITE_BOOKS),
      switchMap(action => this.api.getFavouriteBooks(action.payload.readerId)
        .pipe(
          switchMap((favourites) => [fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId: action.payload.readerId, favourites } })]),
          catchError(((response: HttpErrorResponse) => of(fromActions.FETCH_FAVOURITE_BOOK_FALIURE({ payload: { error: this.adapter.adapt(response.error) } }))))
        ))
    ));

  fetchFavouriteBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_FAVOURITE_BOOKS),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.FAVOURITE_BOOKS_SELECTED()])
    ));

  upsertFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UPSERT_FAVOURITE_BOOKS),
      switchMap(() => [END_PROCESSING_FAVOURITE()])
    ));

  fetchFavouriteBooksFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_FAVOURITE_BOOK_FALIURE),
      map(action => action.payload.error as ApiError),
      tap(error => this.errorActions.reactToApiError(error))
    ), { dispatch: false })

}
