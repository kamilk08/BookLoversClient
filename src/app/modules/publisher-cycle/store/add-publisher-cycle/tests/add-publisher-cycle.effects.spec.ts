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
import { PublisherCycleFacade } from "../../publisher-cycles/publisher-cycle.facade";
import { AddPublisherCycleEffects } from "../add-publisher-cycle.effects";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { UUID } from "angular2-uuid";
import { AddPublisherCycleResponse } from "src/app/modules/api/cycles/responses/add-publisher-cycle.response";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

import * as fromActions from '../add-publisher-cycle.actions';

describe('ADD_PUBLISHER_CYCLE_EFFECTS', () => {

  let effects: AddPublisherCycleEffects;
  let api: PublisherCycleApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();
  let facade: PublisherCycleFacade;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('publisher-cycles', publisherCyclesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddPublisherCycleEffects])
      ],
      providers: [
        AddPublisherCycleEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockActions(() => actions$),
        PublisherCycleFacade
      ]
    });

    api = TestBed.get(PublisherCycleApi);
    facade = TestBed.get(PublisherCycleFacade);
    effects = TestBed.get(AddPublisherCycleEffects);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_PUBLISHER_CYCLE$', () => {
    it('should assign ADD_PUBLISHER_CYCLE_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const response: AddPublisherCycleResponse = {
          publisherCycleId: cycle.identification.id,
          cycleGuid: cycle.identification.guid,
          publisherGuid: UUID.UUID(),
          cycle: 'cycle'
        };

        spyOn(api, 'addPublisherCycle').and.returnValue(of(response));

        const action = fromActions.ADD_PUBLISHER_CYCLE({ payload: { publisherCycle: cycle } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_PUBLISHER_CYCLE_SUCCESS({ payload: { publisherCycleId: cycle.identification.id } });

        expectObservable(effects.addPublisherCycle$)
          .toBe('b', { b: completion });

      });
    });
    it('should assign ADD_PUBLISHER_CYCLE_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        cycle.setPublisherCycleId(1);

        const action = fromActions.ADD_PUBLISHER_CYCLE({ payload: { publisherCycle: cycle } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addPublisherCycle').and.returnValue(response as any);

        const completion = fromActions.ADD_PUBLISHER_CYCLE_FALIURE({ payload: { model: error } })

        expectObservable(effects.addPublisherCycle$)
          .toBe('--b', { b: completion });

      });
    })
  });

});
