import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherCycleApi } from "src/app/modules/api/cycles/publisher-cycle.api";
import { SearchPublisherCycleEffects } from "../search-publisher-cycle.effects";

import * as fromActions from '../search-publisher-cycle.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { UUID } from "angular2-uuid";
import { FETCH_MULTIPLE_PUBLISHER_CYCLES } from "../../publisher-cycles/publisher-cycle.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { SearchPublisherCycle } from "../search-publisher-cycle.reducer";

describe('SEARCH_PUBLISHER_CYCLE_EFFECTS', () => {

  let effects: SearchPublisherCycleEffects;
  let api: PublisherCycleApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ApiErrorAdapter,
        SearchPublisherCycleEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockStore<SearchPublisherCycle>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SearchPublisherCycleEffects);
    api = TestBed.get(PublisherCycleApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('START_FILTERING_PUBLISHER_CYCLES$', () => {
    it('when api call was successfull then two actions should be assign FETCH_FILTERED_CYCLES and FETCH_MULTIPLE_CYCLES', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const action = fromActions.START_FILTERING_PUBLISHER_CYCLES({ payload: { query: DEFAULT_QUERY() } });

        spyOn(api, 'findPublisherCycle').and.returnValue(of([cycle]));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_FILTERED_PUBLISHER_CYCLES({ payload: { cycles: [cycle] } });
        const secondAction = FETCH_MULTIPLE_PUBLISHER_CYCLES({ payload: { cycles: [cycle] } });

        expectObservable(effects.startFilteringPublisherCycles$)
          .toBe('(bc)', { b: firstAction, c: secondAction });

      });
    });

    it('when api call was not successfull then FILTER_CYCLES_FALIURE should be assign', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_FILTERING_PUBLISHER_CYCLES({ payload: { query: DEFAULT_QUERY() } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'findPublisherCycle')
          .and.returnValue(response as any);

        const completion = fromActions.FILTER_PUBLISHER_CYCLES_FALIURE({ payload: { error } });

        expectObservable(effects.startFilteringPublisherCycles$)
          .toBe('--b', { b: completion });

      });

    });

  });
});
