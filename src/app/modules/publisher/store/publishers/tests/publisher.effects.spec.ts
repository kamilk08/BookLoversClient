import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Actions, EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { StoreModule } from "@ngrx/store";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherApi } from "src/app/modules/api/publishers/publisher.api";
import { publishersReducer } from "../..";
import { PublisherEffects } from "../publisher.effects";
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { of } from "rxjs";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { PublishersState } from "../publisher.reducer";
import * as fromActions from '../publisher.actions';

describe('PUBLISHER_EFFECTS', () => {

  let effects: PublisherEffects;
  let api: PublisherApi;
  let scheduler: TestScheduler;
  let actions$: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('publishers', publishersReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PublisherEffects])
      ],
      providers: [
        PublisherEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockStore<PublishersState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PublisherEffects);
    api = TestBed.get(PublisherApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_PUBLISHER$', () => {
    it('should assign FETCH_PUBLISHER action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const publisherId = 1;

        const publisher = new Publisher('publisher');
        publisher.setPublisherId(publisherId);

        const action = fromActions.SELECT_PUBLISHER({ payload: { id: publisherId } });

        spyOn(api, 'getPublisherById').and.returnValue(of(publisher));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_PUBLIHSER({ payload: { publisher } });

        expectObservable(effects.selectPublisher$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign FETCH_PUBLISHER_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_PUBLISHER({ payload: { id } })

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getPublisherById').and.returnValue(response as any);

        const completion = fromActions.FETCH_PUBLISHER_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectPublisher$)
          .toBe('--b', { b: completion });
      });

    });
  });
});
