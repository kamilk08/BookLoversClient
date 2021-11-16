import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ProfileApi } from "src/app/modules/api/profiles/profile.api";
import { ProfileEffects } from "../profile.effects";

import * as fromActions from '../profile.actions';
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { UUID } from "angular2-uuid";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { SEXES } from "src/app/modules/shared";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { Profiles } from "../profile.reducer";

describe('PROFILE_EFFECTS', () => {

  let effects: ProfileEffects;
  let api: ProfileApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ProfileEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        ErrorActions,
        provideMockActions(() => actions$),
        provideMockStore<Profiles>()
      ]
    });

    effects = TestBed.get(ProfileEffects);
    api = TestBed.get(ProfileApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_PROFILE', () => {
    it('should assign FETCH_PROFILE when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;

        const profile = new Profile();
        profile.about = new About('about', 'webstie', new Date());
        profile.address = new Address('country', 'city');
        profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
        profile.identification = { id: 1, guid: UUID.UUID() };
        profile.userId = userId;

        const action = fromActions.SELECT_PROFILE({ payload: { userId } });

        spyOn(api, 'getProfile').and.returnValue(of(profile));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_PROFILE({ payload: { profileId: profile.identification.id, profile } });

        expectObservable(effects.selectProfile$).toBe('b', { b: completion });
      })

    });

    it('should assign FETCH_PROFILE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;

        const profile = new Profile();
        profile.about = new About('about', 'webstie', new Date());
        profile.address = new Address('country', 'city');
        profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
        profile.identification = { id: 1, guid: UUID.UUID() };
        profile.userId = userId;

        const action = fromActions.SELECT_PROFILE({ payload: { userId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({error}));

        spyOn(api, 'getProfile').and.returnValue(response as any);

        const completion = fromActions.FETCH_PROFILE_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectProfile$).toBe('-b', { b: completion });

      });

    });
  });


});
