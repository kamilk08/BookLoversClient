import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { RemoveFollowerEffects } from "../remove-follower.effects";

import * as fromActions from '../remove-follower.actions';
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { REMOVE_FOLLOWER_FROM_READER } from "../../followers/reader-followers.actions";
import { REMOVE_FOLLOWING_FROM_READER } from "../../followings/followings.actions";
import { FETCH_IS_FOLLOWING_STATE } from "../../is-following/is-following.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { RemoveFollowerState } from "../remove-follower.reducer";

describe('REMOVE_FOLLOWER_EFFECTS', () => {

  let effects: RemoveFollowerEffects;
  let api: FollowersApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  let followed: Reader = new Reader(new ReaderDetails('followed', 'role', new Date()), 1);
  followed.identification.id = 1;
  let followedBy: Reader = new Reader(new ReaderDetails('followedBy', 'role', new Date()), 1);
  followedBy.identification.id = 2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        RemoveFollowerEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<RemoveFollowerState>({}),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RemoveFollowerEffects);
    api = TestBed.get(FollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('REMOVE_FOLLOWER', () => {
    it('should assign REMOVE_FOLLOWER_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_FOLLOWER({ payload: { followed, followedBy } });

        spyOn(api, 'removeFollower').and.returnValue(of({}))

        actions$ = hot('a', { a: action });

        const completion = fromActions.REMOVE_FOLLOWER_SUCCESS({ payload: { followedById: followedBy.identification.id, followedId: followed.identification.id } });

        expectObservable(effects.removeFollower$)
          .toBe('b', { b: completion });
      })

    });
  });

  describe('REMOVE_FOLLOWER_SUCCESS', () => {
    it('should assign four actions', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_FOLLOWER_SUCCESS({
          payload: {
            followedId: followed.identification.id,
            followedById: followedBy.identification.id
          }
        });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeFollower').and.returnValue(response as any);

        const firstAction = REMOVE_FOLLOWER_FROM_READER({
          payload: {
            followedId: action.payload.followedId,
            followedById: action.payload.followedById
          }
        });
        const secondAction = REMOVE_FOLLOWING_FROM_READER({ payload: { followedById: action.payload.followedById, followedObjectId: action.payload.followedId } });
        const thirdAction = FETCH_IS_FOLLOWING_STATE({ payload: { followedId: action.payload.followedId, flag: false } });
        const fourthAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'User unfollowed successfully.😊' } });

        expectObservable(effects.removeFollowerSuccess$)
          .toBe('(bcde)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction,
            e: fourthAction
          });
      });

    });
  });


});
