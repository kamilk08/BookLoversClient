import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherCycleApi } from "src/app/modules/api/cycles/publisher-cycle.api";
import { publisherCyclesStateReducer } from "../..";
import { PublisherCycleEffects } from "../publisher-cycle.effects";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { UUID } from "angular2-uuid";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { PublisherCyclesState } from "../publisher-cycle.reducer";

import * as fromActions from '../publisher-cycle.actions';


describe('PUBLISHER_CYCLE_EFFECTS', () => {

  let effects: PublisherCycleEffects;
  let api: PublisherCycleApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('publisher-cycles', publisherCyclesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PublisherCycleEffects])
      ],
      providers: [
        PublisherCycleEffects,
        PublisherCycleApi,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        ErrorActions,
        MesssagesFacade,
        provideMockStore<PublisherCyclesState>(),
        provideMockActions(() => actions$)
      ]
    });

    api = TestBed.get(PublisherCycleApi);
    effects = TestBed.get(PublisherCycleEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('SELECT_PUBLISHER_CYCLE$', () => {
    it('should assign FETCH_PUBLISHER_CYCLE when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const id: number = 1;

        const action = fromActions.SELECT_PUBLISHER_CYCLE({ payload: { id } });

        spyOn(api, 'getPublisherCycleById')
          .and.returnValue(of(cycle));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_PUBLISHER_CYCLE({ payload: { cycle } });

        expectObservable(effects.selectPublisherCycle$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign FETCH_PUBLISHER_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const id: number = 1;

        const action = fromActions.SELECT_PUBLISHER_CYCLE({ payload: { id } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getPublisherCycleById').and.returnValue(response as any);

        const completion = fromActions.FETCH_PUBLISHER_CYCLE_FALIURE({ payload: { error } });

        expectObservable(effects.selectPublisherCycle$)
          .toBe('--b', { b: completion });
      });

    });

  });

  describe('SELECT_MULTIPLE_PUBLISHER_CYCLES$', () => {
    it('should assign FETCH_MULTIPLE_PUBLISHER_CYCLES when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const id: number = 1;

        const action = fromActions.SELECT_MULTIPLE_PUBLISHER_CYCLES({ payload: { ids: [id], query: DEFAULT_QUERY() } });

        spyOn(api, 'getPublisherCycles')
          .and.returnValue(of([cycle]));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_MULTIPLE_PUBLISHER_CYCLES({ payload: { cycles: [cycle] } });

        expectObservable(effects.selectMultiplePublisherCycles$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign FETCH_PUBLISHER_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const id: number = 1;

        const action = fromActions.SELECT_MULTIPLE_PUBLISHER_CYCLES({ payload: { ids: [id], query: DEFAULT_QUERY() } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getPublisherCycles').and.returnValue(response as any);

        const completion = fromActions.FETCH_PUBLISHER_CYCLE_FALIURE({ payload: { error } });

        expectObservable(effects.selectMultiplePublisherCycles$)
          .toBe('--b', { b: completion });
      });
    });
  });


});
