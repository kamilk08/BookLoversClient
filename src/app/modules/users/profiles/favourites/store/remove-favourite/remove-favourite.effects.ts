import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FavouritesApi } from 'src/app/modules/api/profiles/favourites/favourites.api';
import { RemoveFavourite } from 'src/app/modules/api/profiles/favourites/models/remove-favourite.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ProfileFacade } from '../../../store/profile/profile.facade';
import { REMOVE_FROM_FAVOURITES_AUTHOR } from '../favourite-authors/favourite-authors.actions';
import { REMOVE_BOOK_FROM_FAVOURITES } from '../favourite-books/favourite-books.actions';
import * as fromActions from './remove-favourite.actions';

@Injectable()
export class RemoveFavouriteEffects {

  constructor(private readonly actions$: Actions,
    private readonly profileFacade: ProfileFacade,
    private readonly authService: AuthService,
    private readonly api: FavouritesApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  removeFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FAVOURITE_AUTHOR),
      withLatestFrom(this.profileFacade.profileByUserId$(this.authService.userId)),
      map(stream => ({ authorGuid: stream[0].payload.authorGuid, profile: stream[1] })),
      switchMap(stream => this.api.removeFavourite(new RemoveFavourite(stream.profile.identification.guid, stream.authorGuid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [
            fromActions.REMOVE_FAVOURITE_AUTHOR_SUCCESS({ payload: { readerId: stream.profile.userId, authorGuid: stream.authorGuid } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_FAVOURITE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeFavouriteAuthorSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FAVOURITE_AUTHOR_SUCCESS),
      switchMap((action) => [
        REMOVE_FROM_FAVOURITES_AUTHOR({ payload: { readerId: action.payload.readerId, favouriteGuid: action.payload.authorGuid } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Favourite removed successfully 😊' } })
      ])
    ));


  removeFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FAVOURITE_BOOK),
      withLatestFrom(this.profileFacade.profileByUserId$(this.authService.userId)),
      map(stream => ({ bookGuid: stream[0].payload.bookGuid, profile: stream[1] })),
      switchMap(stream => this.api.removeFavourite(new RemoveFavourite(stream.profile.identification.guid, stream.bookGuid))
        .pipe(
          switchMap((response: HttpResponse<any>) => [
            fromActions.REMOVE_FAVOURITE_BOOK_SUCCESS({ payload: { readerId: stream.profile.userId, bookGuid: stream.bookGuid } }),
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_FAVOURITE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeFavouriteBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FAVOURITE_BOOK_SUCCESS),
      switchMap((action) => [
        REMOVE_BOOK_FROM_FAVOURITES({ payload: { readerId: action.payload.readerId, bookGuid: action.payload.bookGuid } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book removed successfully.😊' } })
      ])
    ));

  removeFavouriteFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_FAVOURITE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
