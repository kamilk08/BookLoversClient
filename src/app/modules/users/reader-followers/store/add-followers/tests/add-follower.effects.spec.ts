import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { AddFollowerEffects } from "../add-follower.effects";

import * as fromActions from '../add-follower.actions';
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ADD_FOLLOWER_TO_READER } from "../../followers/reader-followers.actions";
import { ADD_FOLLOWING_TO_READER } from "../../followings/followings.actions";
import { FETCH_IS_FOLLOWING_STATE } from "../../is-following/is-following.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { AddFollowerState } from "../add-follower.reducer";

describe('ADD_FOLLOWERS_EFFECTS', () => {

  let effects: AddFollowerEffects
  let scheduler: TestScheduler;
  let api: FollowersApi;
  let actions$: Observable<Action> = new Observable<Action>();

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
        ErrorActions,
        ApiErrorAdapter,
        AddFollowerEffects,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<AddFollowerState>({})
      ]
    });

    effects = TestBed.get(AddFollowerEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(FollowersApi);
  });

  describe('ADD_FOLLOWER$', () => {
    it('should assign ADD_FOLLOWER_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_FOLLOWER({ payload: { followed, followedBy } });

        spyOn(api, 'addFollower').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_FOLLOWER_SUCCESS({ payload: { followedId: followed.identification.id, followedById: followedBy.identification.id } });

        expectObservable(effects.addFollower$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign ADD_FOLLOWER_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_FOLLOWER({ payload: { followed, followedBy } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addFollower').and.returnValue(response as any);

        const completion = fromActions.ADD_FOLLOWER_FALIURE({ payload: { model: error } });

        expectObservable(effects.addFollower$)
          .toBe('-b', { b: completion });
      });

    })
  });

  describe('ADD_FOLLOWER_SUCCESS$', () => {
    it('should assign four actions', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_FOLLOWER_SUCCESS({ payload: { followedById: followedBy.identification.id, followedId: followed.identification.id } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_FOLLOWER_TO_READER({ payload: { followedId: action.payload.followedId, followedById: action.payload.followedById } });
        const secondAction = ADD_FOLLOWING_TO_READER({ payload: { followedById: action.payload.followedById, followedObjectId: action.payload.followedId } });
        const thirdAction = FETCH_IS_FOLLOWING_STATE({ payload: { followedId: action.payload.followedId, flag: true } });
        const fourthAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'User followed succsesfully.😊' } });

        expectObservable(effects.addFollowerSuccess$)
          .toBe('(bcde)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction,
            e: fourthAction
          });

      });
    })

  });

});
