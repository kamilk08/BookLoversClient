import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { FollowersApi } from "src/app/modules/api/followers/followers.api";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { DEFAULT_ITEMS_COUNT } from "src/app/modules/shared/common/query";
import { readerFollowersStateReducer } from "../..";
import { FollowersPageEffects } from "../followers-page.effects";
import { FollowersPageFacade } from "../followers-page.facade";
import { FollowersPageOption } from "../followers-page.reducer";

describe('FOLLOWERS_PAGE_FACADE', () => {

  let api: FollowersApi;
  let facade: FollowersPageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('reader-followers', readerFollowersStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        FollowersPageEffects,
        FollowersPageFacade,
        ApiErrorAdapter
      ]
    });

    api = TestBed.get(FollowersApi);
    facade = TestBed.get(FollowersPageFacade);
  });

  describe('SET_READER_ID_ON_FOLLOWERS_PAGE', () => {
    it('it should dispatch an action and as a result of which readerId$ observable should emit new value', async (done) => {

      let readerId = 1;

      facade.setReaderIdOnFollowersPage(readerId);

      const subscription = facade.readerId$.subscribe(val => {
        expect(val).toEqual(readerId);
        done();
      });

      subscription.unsubscribe();

    });
  });

  describe('SET_FOLLOWERS_COUNT', () => {
    it('should dispatch an action and as a result of which currentFollowersCount$ observable should emit new value', async (done) => {

      facade.setFollowersCount(DEFAULT_ITEMS_COUNT);

      const subscription = facade.currentFollowersCount$.subscribe(val => {
        expect(val).toEqual(DEFAULT_ITEMS_COUNT);
        done();
      });

      subscription.unsubscribe();
    })
  });

  describe('SET_FOLLOWINGS_COUNT', () => {
    it('should dispatch an action and as a result of which currentFollowingsCount$ should emit new value', async (done) => {

      facade.setFollowingsCount(DEFAULT_ITEMS_COUNT);

      const subscription = facade.currentFollowingsCount$
        .subscribe(val => {
          expect(val).toEqual(DEFAULT_ITEMS_COUNT);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SET_FOLLOWERS_PAGE_OPTION', () => {
    it('should dispatch an action and as a result of which showFollowers$ observable should emit new value', async (done) => {

      facade.moveToFollowers();

      const subscription = facade.showFollowers$
        .subscribe(val => {
          expect(val).toBeTruthy();
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SET_SEARCH_PHRASE', () => {
    it('should dispatch an action and as a result of which searchPhrase$ observable should emit new value', async (done) => {

      const phrase = 'phrase';

      facade.setSearchPhrase(phrase);

      const subscription = facade.searchPhrase$
        .subscribe(val => {
          expect(val).toEqual(phrase);
          done();
        });

      subscription.unsubscribe();

    });
  });

});
