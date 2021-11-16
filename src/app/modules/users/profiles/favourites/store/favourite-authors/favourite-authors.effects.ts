import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FavouritesApi } from 'src/app/modules/api/profiles/favourites/favourites.api';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { END_PROCESSING_FAVOURITE } from '../add-favourite/add-favourite.actions';
import * as fromActions from './favourite-authors.actions';


@Injectable()
export class FavouriteAuthorsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: FavouritesApi,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  selectFavouriteAuthors$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_FAVOURITE_AUTHORS),
      mergeMap(action => this.api.getFavouriteAuthors(action.payload.readerId)
        .pipe(
          switchMap((favourites) => [fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId: action.payload.readerId, favourites: favourites } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_FAVOURITE_AUTHORS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchFavouriteAuthors$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_FAVOURITE_AUTHORS),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.FAVOURITE_AUTHORS_SELECTED()])
    ));

  upsertFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UPSERT_FAVOURITE_AUTHORS),
      switchMap(() => [END_PROCESSING_FAVOURITE()])
    ));

}
