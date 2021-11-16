import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { FollowersPaginationEffects } from "../followers-pagination.effects";

import * as fromActions from '../followers-pagination.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_READER_FOLLOWERS } from "../../followers/reader-followers.actions";
import { Follower } from "src/app/modules/shared";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { FollowersPaginationState } from "../followers-pagination.reducer";

describe('FOLLOWERS_PAGINATION_EFFECTS', () => {

  let effects: FollowersPaginationEffects;
  let api: FollowersApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        FollowersPaginationEffects,
        provideMockActions(() => actions$),
        provideMockStore<FollowersPaginationState>(),
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    effects = TestBed.get(FollowersPaginationEffects);
    api = TestBed.get(FollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_READER_FOLLOWERS$', () => {
    it('should dispatch SET_READER_FOLLOWERS_PAGE and FETCH_READER_FOLLOWERS actions when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;
        const query = DEFAULT_QUERY();

        const action = fromActions.SELECT_READER_FOLLOWERS_PAGE({ payload: { readerId, query } });

        const pageResult: PageResult = {
          items: [2],
          pagesCount: 1,
          page: 0,
          totalItems: 1
        };

        spyOn(api, 'getFollowersPage').and.returnValue(of(pageResult));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_READER_FOLLOWER_PAGE({ payload: { readerId, pageResult } });
        const secondAction = FETCH_READER_FOLLOWERS({ payload: { readerId, followers: [new Follower(readerId, pageResult.items[0])] } });

        expectObservable(effects.selectReaderFollowers$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      });
    });

    it('should dispatch SET_READER_FOLLOWERS_PAGE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;
        const query = DEFAULT_QUERY();

        const action = fromActions.SELECT_READER_FOLLOWERS_PAGE({ payload: { readerId, query } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getFollowersPage').and.returnValue(response as any);

        const completion = fromActions.SET_READER_FOLLOWERS_PAGE_FALIURE({ payload: { error } });

        expectObservable(effects.selectReaderFollowers$)
          .toBe('-b', { b: completion });

      })
    });

  });

});
