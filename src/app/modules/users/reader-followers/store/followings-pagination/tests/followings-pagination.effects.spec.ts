import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { FollowingsPaginationEffects } from "../followings-pagination.effects";

import * as fromActions from '../followings-pagination.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_READER_FOLLOWINGS } from "../../followings/followings.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { provideMockStore } from "@ngrx/store/testing";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ReaderFollowingsPaginationState } from "../followings-pagination.reducer";

describe('FOLLOWINGS_PAGINATION_EFFECTS', () => {

  let effects: FollowingsPaginationEffects;
  let api: FollowersApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule
      ],
      providers: [
        ApiErrorAdapter,
        ErrorsFacade,
        ErrorActions,
        MesssagesFacade,
        FollowingsPaginationEffects,
        provideMockActions(() => actions$),
        provideMockStore<ReaderFollowingsPaginationState>()
      ]
    });

    effects = TestBed.get(FollowingsPaginationEffects);
    api = TestBed.get(FollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_READER_FOLLOWINGS_PAGE$', () => {
    it('should assign SET_READER_FOLLOWINGS_PAGE and FETCH_READER_FOLLOWINGS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;
        const query = DEFAULT_QUERY();

        const action = fromActions.SELECT_READER_FOLLOWINGS_PAGE({ payload: { readerId, query } });

        const pageResult: PageResult = {
          items: [],
          page: 0,
          pagesCount: 0,
          totalItems: 0
        };

        spyOn(api, 'getFollowingsPage').and.returnValue(of(pageResult));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_READER_FOLLOWINGS_PAGE({ payload: { readerId, pageResult } });
        const secondAction = FETCH_READER_FOLLOWINGS({ payload: { readerId: action.payload.readerId, followings: pageResult.items } });

        expectObservable(effects.selectReaderFollowingsPage$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      })

    });

    it('should assign SET_READER_FOLLOWINGS_PAGE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;
        const query = DEFAULT_QUERY();

        const action = fromActions.SELECT_READER_FOLLOWINGS_PAGE({ payload: { readerId, query } })

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getFollowingsPage').and.returnValue(response as any);

        const completion = fromActions.SET_READER_FOLLOWINGS_PAGE_FALIURE({ payload: { error } });

        expectObservable(effects.selectReaderFollowingsPage$)
          .toBe('-b', { b: completion });

      });

    });
  });


});
