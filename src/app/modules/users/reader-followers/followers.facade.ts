import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Reader } from '../../api/readers/models/reader.model';
import { ADD_FOLLOWER } from './store/add-followers/add-follower.actions';
import { REMOVE_FOLLOWER } from './store/remove-followers/remove-follower.actions';
import { SELECT_READER_FOLLOWERS_PAGE } from './store/followers-pagination/followers-pagination.actions';
import { SELECT_READER_FOLLOWINGS_PAGE } from './store/followings-pagination/followings-pagination.actions';
import { IS_FOLLOWING } from './store/is-following/is-following.actions';
import { Query } from '../../shared/common/query';

import * as fromSelectors from './store/module.selectors';
import * as fromModule from './store/index';

@Injectable()
export class FollowersFacade {

  public readonly processingFollowersPage$ = this.store.select(fromSelectors.processingFollowersPage);
  public readonly processingFollowingsPage$ = this.store.select(fromSelectors.processingPage);

  public readonly followers$ = (readerId: number) => this.store.select(fromSelectors.followers(readerId));
  public readonly followersPage$ = (readerId: number) => this.store.select(fromSelectors.followersPageResult(readerId));
  public readonly currentFollowersPage$ = (readerId: number) => this.store.select(fromSelectors.currentFollowersPage(readerId));
  public readonly followersTotalItems$ = (readerId: number) => this.store.select(fromSelectors.followersTotalItems(readerId));

  public readonly takeFirstTenFollowers$ = (readerId: number) => this.store.select(fromSelectors.takeFirstTenFollowers(readerId));
  public readonly followersCount$ = (readerId: number) => this.store.select(fromSelectors.followersCount(readerId));
  public readonly isFollowedBy$ = (followedId: number, followedById: number) => this.store.select(fromSelectors.isFollowedBy(followedId, followedById));

  public readonly followings$ = (readerId: number) => this.store.select(fromSelectors.readerFollowings(readerId));
  public readonly followingsPage$ = (readerId: number) => this.store.select(fromSelectors.followingsPageResult(readerId));
  public readonly currentFollowingsPage$ = (readerId: number) => this.store.select(fromSelectors.currentFollowingsPage(readerId));
  public readonly followingsTotalItems$ = (readerId: number) => this.store.select(fromSelectors.followingsTotalItems$(readerId));

  public readonly hasFollowing$ = (firstReaderId: number, secondReaderId: number) => this.store.select(fromSelectors.hasFollowing(firstReaderId, secondReaderId));
  public readonly isFollowing$ = (followedId: number) => this.store.select(fromSelectors.isFollowing(followedId));

  public readonly addingFollower$ = this.store.select(fromSelectors.addingFollower);
  public readonly removingFollower$ = this.store.select(fromSelectors.removingFollower);

  constructor(private store: Store<fromModule.ReaderFollowersModuleState>) { }

  selectFollowers(readerId: number, query: Query) {
    this.store.dispatch(SELECT_READER_FOLLOWERS_PAGE({ payload: { readerId, query } }))
  }

  selectFollowings(readerId: number, query: Query) {
    this.store.dispatch(SELECT_READER_FOLLOWINGS_PAGE({ payload: { readerId, query } }))
  }

  addFollower(followed: Reader, followedBy: Reader) {
    this.store.dispatch(ADD_FOLLOWER({ payload: { followed, followedBy } }))
  }

  removeFollower(followed: Reader, followedBy: Reader) {
    this.store.dispatch(REMOVE_FOLLOWER({ payload: { followed, followedBy } }))
  }

  isFollowing(followedId: number) {
    this.store.dispatch(IS_FOLLOWING({ payload: { followedId } }));
  }
}
