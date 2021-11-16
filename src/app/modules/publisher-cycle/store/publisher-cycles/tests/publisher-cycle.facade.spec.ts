import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { PublisherCycleApi } from "src/app/modules/api/cycles/publisher-cycle.api";
import { AddPublisherCycleResponse } from "src/app/modules/api/cycles/responses/add-publisher-cycle.response";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { publisherCyclesStateReducer } from "../..";
import { PublisherCycleEffects } from "../publisher-cycle.effects";
import { PublisherCycleFacade } from "../publisher-cycle.facade";

describe('PUBLISHER_CYCLE_FACADE', () => {

  let facade: PublisherCycleFacade;
  let api: PublisherCycleApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('publisher-cycles', publisherCyclesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PublisherCycleEffects])
      ],
      providers: [
        PublisherCycleFacade,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(PublisherCycleFacade);
    api = TestBed.get(PublisherCycleApi);
  });

  describe('SELECT_SINGLE', () => {
    it('should dispatch an action and the result of which should be an api call and after that publisherCycleById$ observable should emit a new value', async (done) => {

      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const id: number = 1;

      spyOn(api, 'getPublisherCycleById').and.returnValue(of(cycle));

      facade.selectSingle(id);

      const subscription = facade.publisherCycleById$(id)
        .subscribe(val => {
          expect(val).toEqual(cycle);
          done();
        });

      subscription.unsubscribe();
    });

  });

  describe('SELECT_MULTIPLE', () => {
    it('should dispatch an action and the result of which should be an api call and after that multiplePublisherCycles$ observable should emit a new value', async (done) => {

      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      cycle.setPublisherCycleId(1);

      const id: number = 1;

      spyOn(api, 'getPublisherCycles').and.returnValue(of([cycle]));

      facade.selectMultiple([id], DEFAULT_QUERY());

      const subscription = facade.multiplePublisherCycles$([id])
        .subscribe(val => {
          expect(val).toEqual([cycle]);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('ADD_PUBLISHER_CYCLE', () => {

    it('should dispatch an action and the result of which should be an api call and after that multiplePublisherCycles$ observable should emit a new value', async (done) => {
      const publisher = new Publisher('publisher')

      const response: AddPublisherCycleResponse = {
        publisherCycleId: 1,
        cycleGuid: UUID.UUID(),
        publisherGuid: publisher.identification.guid,
        cycle: 'cycle'
      };

      spyOn(api, 'addPublisherCycle').and.returnValue(of(response));

      facade.addPublisherCycle('cycle', publisher);

      const subscription = facade.addedPublisherCycle$
        .subscribe(val => {
          expect(val.name).toEqual('cycle')
          done();
        });

      subscription.unsubscribe();
    })

  });

});
