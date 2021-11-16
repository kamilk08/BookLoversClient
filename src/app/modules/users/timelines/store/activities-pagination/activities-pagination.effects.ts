import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, catchError, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_ACTIVITIES } from '../activities/activities.actions';
import * as fromActions from './activities-pagination.actions';
import { TimeLineApi } from 'src/app/modules/api/timelines/timeline.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ActivitiesPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: TimeLineApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectTimelineActivities$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_ACTIVITIES_PAGE),
      switchMap(action => this.api.getTimeLineActivities(action.payload.timelineId, action.payload.query, action.payload.hidden)
        .pipe(
          switchMap(pageResult => [
            fromActions.SET_ACTIVITIES_PAGE({ payload: { pageResult } }),
            FETCH_ACTIVITIES({ payload: { activities: pageResult.items } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_ACTIVITIES_PAGE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  setActivities$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_ACTIVITIES_PAGE),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.END_SELECTING()])
    ))

  setActivitiesPageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_ACTIVITIES_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
