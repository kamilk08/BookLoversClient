import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { TimeLineApi } from "src/app/modules/api/timelines/timeline.api";
import { TimeLineEffects } from "../timeline.effects";

import * as fromActions from '../timeline.actions';
import { TimeLine } from "src/app/modules/api/timelines/models/timeline.interface";
import { UUID } from "angular2-uuid";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { TimeLinesState } from "../timeline.reducer";

describe('TIMELINE_EFFECTS', () => {

  let effects: TimeLineEffects;
  let api: TimeLineApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        TimeLineEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<TimeLinesState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimeLineEffects);
    api = TestBed.get(TimeLineApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_READER_TIMELINE$', () => {
    it('should assign FETCH_TIMELINE action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const timeLine: TimeLine = {
          indentification: {
            id: 1,
            guid: UUID.UUID()
          },
          readerId,
          activitiesCount: 0
        };

        const action = fromActions.SELECT_READER_TIMELINE({ payload: { readerId } })

        spyOn(api, 'getReaderTimeLine').and.returnValue(of(timeLine))

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_READER_TIMELINE({ payload: { timeLine } });

        expectObservable(effects.selectReaderTimeLine$)
          .toBe('b', { b: completion });

      })

    });
  });

});
