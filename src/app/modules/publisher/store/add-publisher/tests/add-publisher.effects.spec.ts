import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherApi } from "src/app/modules/api/publishers/publisher.api";
import { publishersReducer } from "../..";
import { AddPublisherEffects } from "../add-publisher.effects";

import * as fromActions from '../add-publisher.actions';
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { AddPublisherResponse } from "src/app/modules/api/publishers/responses/add-publisher.response";
import { UUID } from "angular2-uuid";
import { PublisherFacade } from "../../publishers/publisher.facade";
import { FETCH_PUBLIHSER } from "../../publishers/publisher.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_PUBLISHER_EFFECTS', () => {

  let api: PublisherApi;
  let effects: AddPublisherEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let facade: PublisherFacade;

  let publisher = new Publisher('publisher');
  publisher.setPublisherId(1);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('publishers', publishersReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddPublisherEffects])
      ],
      providers: [
        ApiErrorAdapter,
        ErrorActions,
        AddPublisherEffects,
        MesssagesFacade,
        ErrorsFacade,
        {
          provide: PublisherFacade,
          useValue: {
            addedPublisher$: of(publisher)
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(PublisherApi);
    effects = TestBed.get(AddPublisherEffects);
    facade = TestBed.get(PublisherFacade);

  });

  describe('ADD_PUBLISHER$', () => {
    it('should assign ADD_PUBLISHER_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const response: AddPublisherResponse = {
          publisherId: 1,
          publisherGuid: UUID.UUID(),
          name: 'publisher'
        };

        spyOn(api, 'addPublisher').and.returnValue(of(response));

        const action = fromActions.ADD_PUBLISHER({ payload: { publisher } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_PUBLISHER_SUCCESS({ payload: { publisherId: 1 } });

        expectObservable(effects.addPublisher$).toBe('b', { b: completion });
      });

    });

    it('should assign ADD_PUBLISHER_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const publisher = new Publisher('publisher');
        publisher.setPublisherId(1);

        const action = fromActions.ADD_PUBLISHER({ payload: { publisher } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addPublisher').and.returnValue(response as any);

        const completion = fromActions.ADD_PUBLISHER_FALIURE({ payload: { model: error } });

        expectObservable(effects.addPublisher$)
          .toBe('--b', { b: completion });
      });
    });
  });

  describe('ADD_PUBLISHER_SUCCESS$', () => {
    it('should assign FETCH_PUBLISHER and SHOW_SUCCESS_MESSAGE actions', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const publisherId = 1;

        const action = fromActions.ADD_PUBLISHER_SUCCESS({ payload: { publisherId } });

        actions$ = hot('a', { a: action });

        const firstAction = FETCH_PUBLIHSER({ payload: { publisher } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Publisher added successfully.😊' } });

        expectObservable(effects.addPublisherSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      });

    });
  });

});
