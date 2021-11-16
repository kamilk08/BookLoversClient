import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseSettingsApi } from "src/app/modules/api/bookcases/settings/bookcase-settings.api";
import { BookcaseSettingsEffects } from "../bookcase-settings.effects";

import * as fromActions from '../bookcase-settings.actions';
import { Bookcase } from "src/app/modules/bookcases/models";
import { UUID } from "angular2-uuid";
import { BookcaseSettings } from "../../../models/bookcase-settings.model";
import { Privacy } from "src/app/modules/shared/models/privacy";
import { provideMockActions } from "@ngrx/effects/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { BookcaseSettingsState } from "../..";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('BOOKCASE_SETTINGS_EFFECTS', () => {

  let effects: BookcaseSettingsEffects;
  let api: BookcaseSettingsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let bookcase = new Bookcase(1);
  bookcase.identification.guid = UUID.UUID();

  let settings = new BookcaseSettings(5, Privacy.Public.id);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookcaseSettingsEffects,
        provideMockStore<BookcaseSettingsState>(),
        provideMockActions(() => actions$),
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ],
      imports: [
        HttpClientModule,
        ApiModule
      ]
    });

    effects = TestBed.get(BookcaseSettingsEffects);
    api = TestBed.get(BookcaseSettingsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('CHANGE_SETTINGS$', () => {
    it('should assign CHANGE_BOOKCASE_SETTINGS_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.CHANGE_BOOKCASE_SETTINGS({ payload: { bookcase, settings } });

        spyOn(api, 'changeBookcaseOptions').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_BOOKCASE_SETTINGS_SUCCESS({ payload: { bookcase, settings } });

        expectObservable(effects.changeSettings$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign CHANGE_BOOKCASE_SETTINGS_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.CHANGE_BOOKCASE_SETTINGS({ payload: { bookcase, settings } })

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changeBookcaseOptions').and.returnValue(response as any);

        const completion = fromActions.CHANGE_BOOKCASE_SETTINGS_FALIURE({ payload: { model: error } });

        expectObservable(effects.changeSettings$)
          .toBe('-b', {
            b: completion
          });
      });
    });
  });
});
