import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './timeline.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TimeLineApi } from 'src/app/modules/api/timelines/timeline.api';
import { TimelineNotFound } from '../../models/timeline-not-found';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';

@Injectable()
export class TimeLineEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: TimeLineApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectTimeLine$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_TIMELINE),
      mergeMap(action => this.api.getReaderTimeLine(action.payload.id)
        .pipe(
          map(timeLine => timeLine !== undefined ? fromActions.FETCH_READER_TIMELINE({ payload: { timeLine } })
            : fromActions.TIMELINE_NOT_FOUND({ payload: { model: new TimelineNotFound() } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_TIMELINE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  selectReaderTimeLine$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_TIMELINE),
      mergeMap(action => this.api.getReaderTimeLine(action.payload.readerId)
        .pipe(
          map(timeLine => timeLine !== undefined ? fromActions.FETCH_READER_TIMELINE({ payload: { timeLine } })
            : fromActions.TIMELINE_NOT_FOUND({ payload: { model: TimelineNotFound.withReaderId(action.payload.readerId) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_TIMELINE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchReaderTimelineFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_READER_TIMELINE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

  timelineNotFound$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.TIMELINE_NOT_FOUND),
      tap((action) => this.errorActions.reactToApiError(ApiError.notFound()))
    ))

}
