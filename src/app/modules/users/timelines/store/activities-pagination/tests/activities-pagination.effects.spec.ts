import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { TimeLineApi } from "src/app/modules/api/timelines/timeline.api";
import { ActivitiesPaginationEffects } from "../activities-pagination.effects";

import * as fromActions from '../activities-pagination.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_ACTIVITIES } from "../../activities/activities.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { TimeLineActivitiesPagination } from "../activities-pagination.reducer";

describe('ACTIVITIES_PAGINATION', () => {

  let effects: ActivitiesPaginationEffects;
  let api: TimeLineApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        ApiErrorAdapter,
        ActivitiesPaginationEffects,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<TimeLineActivitiesPagination>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ActivitiesPaginationEffects);
    api = TestBed.get(TimeLineApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_TIMELINE_ACTIVITIES$', () => {
    it('should assign SET_ACTIVITIES_PAGE and FETCH_ACTIVITIES when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const timelineId = 1;
        const hidden = true;

        const action = fromActions.SELECT_ACTIVITIES_PAGE({ payload: { timelineId, query: DEFAULT_QUERY(), hidden } });

        const pageResult: PageResult = {
          page: 0,
          pagesCount: 0,
          items: [],
          totalItems: 0
        };

        spyOn(api, 'getTimeLineActivities').and.returnValue(of(pageResult));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_ACTIVITIES_PAGE({ payload: { pageResult } });
        const secondAction = FETCH_ACTIVITIES({ payload: { activities: pageResult.items } });

        expectObservable(effects.selectTimelineActivities$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });
    });

    it('should assign SET_ACTIVITIES_PAGE_ERROR when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const timelineId = 1;
        const hidden = true;

        const action = fromActions.SELECT_ACTIVITIES_PAGE({ payload: { timelineId, query: DEFAULT_QUERY(), hidden } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getTimeLineActivities').and.returnValue(response as any);

        const completion = fromActions.SET_ACTIVITIES_PAGE_FALIURE({ payload: { error } });

        expectObservable(effects.selectTimelineActivities$)
          .toBe('-b', { b: completion });
      });
    })
  });

  describe('SET_ACTIVITIES$', () => {
    it('should assign END_SELECTING action after 1.5s', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const pageResult: PageResult = {
          page: 0,
          pagesCount: 0,
          items: [],
          totalItems: 0
        };

        const action = fromActions.SET_ACTIVITIES_PAGE({ payload: { pageResult } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.END_SELECTING();

        expectObservable(effects.setActivities$)
          .toBe('1.5s b', { b: completion });

      });
    });
  })

});
