import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { TestScheduler } from "rxjs/testing";
import { AuthApi } from "src/app/modules/api/auth/auth.api";
import { authModuleReducer } from "../..";
import { BlockAccountEffects } from "../block-account/block-account.effects";

import * as fromAction from '../block-account/block-account.actions';
import { UUID } from "angular2-uuid";
import { Observable } from "rxjs";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { UPDATE_PROMOTION_WAITER } from "src/app/modules/librarians/manage-users/store/promotion-waiters/promotion-waiters.actions";
import { PromotionStatus } from "src/app/modules/api/librarians/models/promotion-status.model";

describe('block account effects', () => {
  let effects: BlockAccountEffects;
  let api: AuthApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authModuleReducer', authModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BlockAccountEffects])
      ],
      providers: [BlockAccountEffects, AuthApi,
        ErrorActions, ApiErrorAdapter,
        provideMockActions(() => actions$),
        MesssagesFacade,
        ErrorsFacade
      ]
    });
    effects = TestBed.get(BlockAccountEffects);
    api = TestBed.get(AuthApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })

  describe('blockAccount$', () => {
    it('should dispatch BLOCK_ACCOUNT_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const readerGuid = UUID.UUID();

        spyOn(api, 'blockAccount').and.returnValue(of({}));

        const action = fromAction.BLOCK_ACCOUNT({ payload: { readerGuid } });
        const completion = fromAction.BLOCK_ACCOUNT_SUCCESS({ payload: { readerGuid } });
        actions$ = hot('a', { a: action });

        expectObservable(effects.blockAccount$)
          .toBe('b', { b: completion });
      })

    });

    it('should dispatch BLOCK_ACCOUNT_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const readerGuid = UUID.UUID();
        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }


        const action = fromAction.BLOCK_ACCOUNT({ payload: { readerGuid } });
        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'blockAccount').and.returnValue(response);

        const completion = fromAction.BLOCK_ACCOUNT_FALIURE({ payload: { error } });

        expectObservable(effects.blockAccount$)
          .toBe('--b', { b: completion })
      })
    });
  });

  describe('blockAccountSuccess$', () => {
    it('should dispatch SHOW_SUCCES_MESSAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action = fromAction.BLOCK_ACCOUNT_SUCCESS({ payload: { readerGuid: UUID.UUID() } });
        const firstAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'User account blocked successfully.😊' } });
        const secondAction = UPDATE_PROMOTION_WAITER({ payload: { readerGuid: action.payload.readerGuid, status: PromotionStatus.notAvailable } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.blockAccountSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      })
    })
  });
})
