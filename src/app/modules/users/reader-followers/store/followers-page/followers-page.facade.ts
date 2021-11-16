import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromModule from '../index';
import * as fromSelectors from './followers-page.selectors';
import { NEXT_FOLLOWERS_PAGE, NEXT_FOLLOWINGS_PAGE, SET_CURRENT_FOLLOWERS_COUNT, SET_CURRENT_FOLLOWINGS_COUNT, SET_FOLLOWERS_PAGE_OPTION, SET_READER_ID_ON_FOLLOWERS_PAGE, SET_SEARCH_PHRASE_ON_FOLLOWERS_PAGE } from "./followers-page.actions";
import { FollowersPageOption } from "./followers-page.reducer";

@Injectable()
export class FollowersPageFacade {

  public readonly readerId$ = this.store.select(fromSelectors.readerId);
  public readonly pageSize$ = this.store.select(fromSelectors.pageSize);
  public readonly searchPhrase$ = this.store.select(fromSelectors.searchPhrase);

  public readonly currentFollowersCount$ = this.store.select(fromSelectors.currentFollowersCount);
  public readonly currentFollowingsCount$ = this.store.select(fromSelectors.currentFollowingsCount);

  public readonly showFollowers$ = this.store.select(fromSelectors.showFollowers);
  public readonly showFollowings$ = this.store.select(fromSelectors.showFollowings);

  constructor(private store: Store<fromModule.ReaderFollowersModuleState>) {

  }

  setReaderIdOnFollowersPage(readerId: number) {
    this.store.dispatch(SET_READER_ID_ON_FOLLOWERS_PAGE({ payload: { readerId } }))
  }

  setFollowersCount(count: number) {
    this.store.dispatch(SET_CURRENT_FOLLOWERS_COUNT({ payload: { count } }))
  }

  setFollowingsCount(count: number) {
    this.store.dispatch(SET_CURRENT_FOLLOWINGS_COUNT({ payload: { count } }));
  }

  moveToFollowers() {
    this.store.dispatch(SET_FOLLOWERS_PAGE_OPTION({ payload: { pageOption: FollowersPageOption.SHOW_FOLLOWERS } }));
  }

  moveToFollowings() {
    this.store.dispatch(SET_FOLLOWERS_PAGE_OPTION({ payload: { pageOption: FollowersPageOption.SHOW_FOLLOWINGS } }))
  }

  setSearchPhrase(phrase: string) {
    this.store.dispatch(SET_SEARCH_PHRASE_ON_FOLLOWERS_PAGE({ payload: { phrase } }))
  }


  nextFollowersPage(page: number) {
    this.store.dispatch(NEXT_FOLLOWERS_PAGE({ payload: { page } }));
  }

  nextFollowingsPage(page: number) {
    this.store.dispatch(NEXT_FOLLOWINGS_PAGE({ payload: { page } }))
  }
}
