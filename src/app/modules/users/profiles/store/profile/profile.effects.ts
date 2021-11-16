import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './profile.actions';
import { Profile } from '../../../../api/profiles/models/profile.model';
import { ProfileApi } from 'src/app/modules/api/profiles/profile.api';
import { ProfileNotFound } from '../../models/profile-not-found';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';

@Injectable()
export class ProfileEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ProfileApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectProfile$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PROFILE),
      mergeMap(action => this.api.getProfile(action.payload.userId)
        .pipe(
          map((profile: Profile) => profile !== undefined ? fromActions.FETCH_PROFILE({ payload: { profile: profile, profileId: profile.identification.id } })
            : fromActions.PROFILE_NOT_FOUND({ payload: { model: ProfileNotFound.withId(action.payload.userId) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PROFILE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  profileNotFound$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.PROFILE_NOT_FOUND),
      tap(action => this.errorActions.reactToApiError(ApiError.notFound()))
    ), { dispatch: false })

  fetchProfileError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_PROFILE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
