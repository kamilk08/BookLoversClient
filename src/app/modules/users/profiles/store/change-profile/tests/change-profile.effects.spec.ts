import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ProfileApi } from "src/app/modules/api/profiles/profile.api";
import { ChangeProfileEffects } from "../change-profile.effects";

import * as fromActions from '../change-profile.actions';
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { SEXES } from "src/app/modules/shared";
import { UUID } from "angular2-uuid";
import { UPDATE_PROFILE } from "../../profile/profile.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ChangeProfileState } from "../change-profile.reducer";

describe('CHANGE_PROFILE_EFFECTS', () => {

  let effects: ChangeProfileEffects;
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
        ChangeProfileEffects,
        ApiErrorAdapter,
        ErrorActions,
        provideMockActions(() => actions$),
        provideMockStore<ChangeProfileState>({}),
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    effects = TestBed.get(ChangeProfileEffects);
    api = TestBed.get(ProfileApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('CHANGE_PROFLE$', () => {
    it('should assign CHANGE_PROFILE_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const profile = new Profile();
        profile.about = new About('about', 'webstie', new Date());
        profile.address = new Address('country', 'city');
        profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
        profile.identification = { id: 1, guid: UUID.UUID() };
        profile.userId = 1;

        const action = fromActions.CHANGE_PROFILE({ payload: { profile } });

        spyOn(api, 'changeProfile').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_PROFILE_SUCCESS({ payload: { profile } });

        expectObservable(effects.changeProfile$)
          .toBe('b', { b: completion });
      });
    });

    it('should assing CHANGE_PROFILE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const profile = new Profile();
        profile.about = new About('about', 'webstie', new Date());
        profile.address = new Address('country', 'city');
        profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
        profile.identification = { id: 1, guid: UUID.UUID() };
        profile.userId = 1;

        const action = fromActions.CHANGE_PROFILE({ payload: { profile } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changeProfile').and.returnValue(response);

        const completion = fromActions.CHANGE_PROFILE_FALIURE({ payload: { model: error } });

        expectObservable(effects.changeProfile$)
          .toBe('-b', { b: completion });
      });

    })
  });

  describe('CHANGE_PROFILE_SUCCESS$', () => {
    it('should assign UPDATE_PROFILE and SHOW_SUCCESS_MESSAGE actions', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const profile = new Profile();
        profile.about = new About('about', 'webstie', new Date());
        profile.address = new Address('country', 'city');
        profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
        profile.identification = { id: 1, guid: UUID.UUID() };
        profile.userId = 1;

        const action = fromActions.CHANGE_PROFILE_SUCCESS({ payload: { profile } });

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_PROFILE({ payload: { profile } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Profile changed.😊' } });

        expectObservable(effects.changeProfileSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });

      });

    })
  });

});
