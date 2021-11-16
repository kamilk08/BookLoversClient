import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { AvatarApi } from "src/app/modules/api/avatars/avatar.api";
import { AvatarEffects } from "../avatar.effects";

import * as fromActions from '../avatar.actions';
import { ChangeAvatar } from "src/app/modules/api/avatars/models/change-avatar.model";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { Avatars } from "../avatar.reducer";

describe('AVATAR_EFFECTS', () => {

  let effects: AvatarEffects;
  let api: AvatarApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        AvatarEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<Avatars>({})
      ]
    });

    effects = TestBed.get(AvatarEffects);
    api = TestBed.get(AvatarApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  })

  describe('CHANGE_AVATAR', () => {
    it('should assign CHANGE_AVATAR_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const model: ChangeAvatar = new ChangeAvatar(undefined, undefined);

        const action = fromActions.CHANGE_AVATAR({ payload: { model } });

        spyOn(api, 'changeAvatar').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_AVATAR_SUCCESS();

        expectObservable(effects.changeAvatar$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign CHANGE_AVATAR_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const model: ChangeAvatar = new ChangeAvatar(undefined, undefined);

        const action = fromActions.CHANGE_AVATAR({ payload: { model } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changeAvatar').and.returnValue(response);

        const completion = fromActions.CHANGE_AVATAR_FALIURE({ payload: { model: error } });

        expectObservable(effects.changeAvatar$).toBe('-b', { b: completion });

      })

    });
  })

});
