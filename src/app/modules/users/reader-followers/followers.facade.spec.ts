import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "../../api/api.module";
import { FollowersApi } from "../../api/followers/followers.api";
import { ErrorActions } from "../../errors/services/error-actions.service";
import { ErrorsFacade } from "../../errors/store/errors.facade";
import { Follower } from "../../shared";
import { PageResult } from "../../shared/common/page-result";
import { DEFAULT_QUERY } from "../../shared/common/query";
import { MesssagesFacade } from "../../shared/store/messages/message.facade";
import { FollowersFacade } from "./followers.facade";
import { readerFollowersStateReducer } from "./store";
import { AddFollowerEffects } from "./store/add-followers/add-follower.effects";
import { FollowersPaginationEffects } from "./store/followers-pagination/followers-pagination.effects";
import { FollowingsPaginationEffects } from "./store/followings-pagination/followings-pagination.effects";
import { IsFollowingEffects } from "./store/is-following/is-following.effects";
import { RemoveFollowerEffects } from "./store/remove-followers/remove-follower.effects";

describe('READER_FOLLOWERS_FACADE', () => {

  let facade: FollowersFacade;
  let api: FollowersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('reader-followers', readerFollowersStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddFollowerEffects, FollowersPaginationEffects,
          FollowingsPaginationEffects,
          IsFollowingEffects,
          RemoveFollowerEffects
        ])
      ],
      providers: [
        FollowersFacade,
        AddFollowerEffects,
        FollowersFacade,
        FollowersPaginationEffects,
        FollowingsPaginationEffects,
        IsFollowingEffects,
        RemoveFollowerEffects,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(FollowersFacade);
    api = TestBed.get(FollowersApi);
  });

  describe('SELECT_FOLLOWERS', () => {
    it('should dispatch an action and as a result of which followers$ observable should emit new value', async (done) => {

      const readerId = 1;
      const followedById = 2;

      const followersPage: PageResult = {
        items: [new Follower(readerId, followedById)],
        page: 0,
        pagesCount: 1,
        totalItems: 1
      };

      spyOn(api, 'getFollowersPage').and.returnValue(of(followersPage));

      facade.selectFollowers(readerId, DEFAULT_QUERY());

      const subscription = facade.followers$(readerId)
        .subscribe(val => {
          expect(val.length).toEqual(followersPage.items.length);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_FOLLOWINGS', () => {
    it('should dispatch an action and as a result of which followings$ observable should emit new value', async (done) => {

      const readerId = 1;
      const followedById = 2;

      const followingsPage: PageResult = {
        items: [new Follower(followedById, readerId)],
        page: 0,
        pagesCount: 1,
        totalItems: 1
      };

      spyOn(api, 'getFollowingsPage').and.returnValue(of(followingsPage))

      facade.selectFollowings(followedById, DEFAULT_QUERY());

      const susbcription = facade.followings$(followedById)
        .subscribe(val => {
          expect(val.length).toEqual(followingsPage.items.length);
          done();
        });

      susbcription.unsubscribe();

    });

  });

  describe('IS_FOLLOWING', () => {
    it('should dispatch an action and as a result of which isFollowing$ observable should emit new value', async (done) => {

      const followedId: number = 1;

      const flag = true;

      spyOn(api, 'isFollowing').and.returnValue(of(flag));

      facade.isFollowing(followedId);

      const subscription = facade.isFollowing$(followedId)
        .subscribe(val => {
          expect(val).toEqual(flag);
          done();
        });

      subscription.unsubscribe();

    });
  });

});
