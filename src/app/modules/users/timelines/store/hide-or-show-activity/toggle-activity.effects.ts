import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { TimeLineApi } from 'src/app/modules/api/timelines/timeline.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { HideActivity } from '../../../../api/timelines/models/hide-activity';
import { ShowActivity } from '../../../../api/timelines/models/show-activity';
import { UPDATE_ACTIVITY } from '../activities/activities.actions';
import { TimeLineFacade } from '../timeline.facade';
import * as fromActions from './toggle-activity.actions';

@Injectable()
export class ToggleActivityEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: TimeLineFacade,
    private readonly api: TimeLineApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  showActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SHOW_ACTIVITY),
      switchMap(action => this.api.showActivity(new ShowActivity(action.payload.activity.activityData.activityObjectGuid,
        action.payload.activity.date, action.payload.activity.activityType.id))
        .pipe(
          switchMap(() => [fromActions.SHOW_ACTIVITY_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.SHOW_ACTIVITY_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  showActivitySuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SHOW_ACTIVITY_SUCCESS),
      withLatestFrom(this.facade.toggledActivity$),
      map(stream => stream[1]),
      switchMap((activity) => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Activity successfully shown.😊' } }),
        UPDATE_ACTIVITY({ payload: { activity } })])
    ));

  showActivityFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SHOW_ACTIVITY_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })


  hideActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.HIDE_ACTIVITY),
      switchMap(action => this.api.hideActivity(new HideActivity(action.payload.activity.activityData.activityObjectGuid, action.payload.activity.date, action.payload.activity.activityType.id))
        .pipe(
          switchMap(() => [
            fromActions.HIDE_ACTIVITY_SUCCESS()
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.HIDE_ACTIVITY_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  hideActivitySuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.HIDE_ACTIVITY_SUCCESS),
      withLatestFrom(this.facade.toggledActivity$),
      map(stream => stream[1]),
      switchMap(activity => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Activity successfully hidden.😊' } }),
        UPDATE_ACTIVITY({ payload: { activity } })])
    ));

  hideActivityFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.HIDE_ACTIVITY_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
