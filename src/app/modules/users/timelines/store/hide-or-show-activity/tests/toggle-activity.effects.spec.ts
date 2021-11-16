import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { UUID } from 'angular2-uuid';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ApiModule } from 'src/app/modules/api/api.module';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { NEW_FOLLOWER } from 'src/app/modules/api/timelines/models/activity-type.interface';
import { TimeLineActivity } from 'src/app/modules/api/timelines/models/timeline-activity.interface';
import { TimeLineApi } from 'src/app/modules/api/timelines/timeline.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ErrorsFacade } from 'src/app/modules/errors/store/errors.facade';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { UPDATE_ACTIVITY } from '../../activities/activities.actions';
import { TimeLineFacade } from '../../timeline.facade';
import * as fromActions from '../toggle-activity.actions';
import { ToggleActivityEffects } from '../toggle-activity.effects';
import { ToggleActivityState } from '../toggle-activity.reducer';

describe('TOGGLE_ACTIVITY_EFFECTS', () => {

  let activity: TimeLineActivity = {
    date: new Date(),
    activityData: {
      id: 1,
      activityObjectGuid: UUID.UUID()
    },
    activityType: NEW_FOLLOWER,
    show: true
  };

  let effects: ToggleActivityEffects;
  let api: TimeLineApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        {
          provide: TimeLineFacade,
          useValue: {
            toggledActivity$: of(activity)
          }
        },
        ToggleActivityEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<ToggleActivityState>({})
      ]
    });

    effects = TestBed.get(ToggleActivityEffects);
    api = TestBed.get(TimeLineApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('SHOW_ACTIVITY$', () => {
    it('should assign SHOW_ACTIVITY_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        activity.show = false;

        const action = fromActions.SHOW_ACTIVITY({ payload: { activity } });

        spyOn(api, 'showActivity').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.SHOW_ACTIVITY_SUCCESS();

        expectObservable(effects.showActivity$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign SHOW_ACTIVITY_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SHOW_ACTIVITY({ payload: { activity } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'showActivity').and.returnValue(response);

        const completion = fromActions.SHOW_ACTIVITY_FALIURE({ payload: { model: error } });

        expectObservable(effects.showActivity$)
          .toBe('-b', { b: completion });
      });
    });
  });

  describe('SHOW_ACTIVITY_SUCCESS$', () => {
    it('should assign SHOW_SUCCESS_MESSAGE and UPDATE_ACTIVITY', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SHOW_ACTIVITY_SUCCESS();

        actions$ = hot('a', { a: action });

        const firstAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Activity successfully shown.😊' } });
        const secondAction = UPDATE_ACTIVITY({ payload: { activity } })

        expectObservable(effects.showActivitySuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      })
    })
  });

  describe('HIDE_ACTIVITY$', () => {
    it('should assign HIDE_ACTIVITY when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.HIDE_ACTIVITY({ payload: { activity } });

        spyOn(api, 'hideActivity').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.HIDE_ACTIVITY_SUCCESS();

        expectObservable(effects.hideActivity$)
          .toBe('b', { b: completion });
      })
    });

    it('should assign HIDE_ACTIVITY_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.HIDE_ACTIVITY({ payload: { activity } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'hideActivity').and.returnValue(response);

        const completion = fromActions.HIDE_ACTIVITY_FALIURE({ payload: { model: error } });

        expectObservable(effects.hideActivity$)
          .toBe('-b', { b: completion });
      });
    });
  });

  describe('HIDE_ACTIVITY_SUCCESS$', () => {
    it('should assign SHOW_SUCCESS_MESSAGE and UPDATE_ACTIVITY action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.HIDE_ACTIVITY_SUCCESS();

        actions$ = hot('a', { a: action });

        const firstAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Activity successfully hidden.😊' } });
        const secondAction = UPDATE_ACTIVITY({ payload: { activity } });

        expectObservable(effects.hideActivitySuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      })

    });
  });

});
