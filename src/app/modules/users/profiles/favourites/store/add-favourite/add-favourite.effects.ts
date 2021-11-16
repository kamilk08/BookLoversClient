import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FavouritesApi } from 'src/app/modules/api/profiles/favourites/favourites.api';
import { AddFavouriteAuthor } from 'src/app/modules/api/profiles/favourites/models/add-favourite-author.model';
import { AddFavouriteBook } from 'src/app/modules/api/profiles/favourites/models/add-favourite-book.model';
import { FavouriteAuthor } from 'src/app/modules/api/profiles/favourites/models/favourite-author.model';
import { FavouriteBook } from 'src/app/modules/api/profiles/favourites/models/favourite-book.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SELECT_AUTHOR_BY_GUID } from 'src/app/modules/authors/store/authors/author.actions';
import { SELECT_BOOK_BY_GUID } from 'src/app/modules/books/store/book.actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ProfileFacade } from '../../../store/profile/profile.facade';
import { UPSERT_FAVOURITE_AUTHORS } from '../favourite-authors/favourite-authors.actions';
import { UPSERT_FAVOURITE_BOOKS } from '../favourite-books/favourite-books.actions';
import * as fromActions from './add-favourite.actions';

@Injectable()
export class AddFavouriteEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly profileFacade: ProfileFacade,
    private readonly authService: AuthService,
    private readonly api: FavouritesApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  addFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FAVOURITE_AUTHOR),
      withLatestFrom(this.profileFacade.profileByUserId$(this.authService.userId)),
      map(stream => ({ authorGuid: stream[0].payload.authorGuid, profile: stream[1] })),
      switchMap(stream => this.api.addFavouriteAuthor(new AddFavouriteAuthor(stream.profile.identification.guid, stream.authorGuid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.ADD_FAVOURITE_AUTHOR_SUCCESS({ payload: { readerId: stream.profile.userId, favouriteGuid: stream.authorGuid } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_FAVOURITE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  addFavouriteAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FAVOURITE_AUTHOR_SUCCESS),
      delay(500),
      switchMap(action => [
        UPSERT_FAVOURITE_AUTHORS({ payload: { readerId: action.payload.readerId, favourite: new FavouriteAuthor(action.payload.favouriteGuid) } }),
        SELECT_AUTHOR_BY_GUID({ payload: { guid: action.payload.favouriteGuid } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Favourite added sucessfully.😊' } })
      ])
    ));

  addFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FAVOURITE_BOOK),
      withLatestFrom(this.profileFacade.profileByUserId$(this.authService.userId)),
      map(stream => ({ bookGuid: stream[0].payload.bookGuid, profile: stream[1] })),
      switchMap(stream => this.api.addFavouriteBook(new AddFavouriteBook(stream.bookGuid, stream.profile.identification.guid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [fromActions.ADD_FAVOURITE_BOOK_SUCCESS({ payload: { readerId: stream.profile.userId, favouriteGuid: stream.bookGuid } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_FAVOURITE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } }))
          ))
      )));

  addFavouriteBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FAVOURITE_BOOK_SUCCESS),
      delay(500),
      switchMap(action => [
        UPSERT_FAVOURITE_BOOKS({ payload: { readerId: action.payload.readerId, favourite: new FavouriteBook(action.payload.favouriteGuid) } }),
        SELECT_BOOK_BY_GUID({ payload: { guid: action.payload.favouriteGuid } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Favourite added sucessfully.😊' } })
      ])
    ));

  addFavouriteFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_FAVOURITE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
