import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Query } from 'src/app/modules/shared/common/query';
import { ADD_FOLLOWER, GET_FOLLOWERS_IDS, GET_FOLLOWINGS_IDS, IS_FOLLOWING, REMOVE_FOLLOWER } from './followers.urls';
import { Observable } from 'rxjs';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { AddFollower } from './models/add-follower.interface';
import { RemoveFollower } from './models/remove-follower.interface';

@Injectable()
export class FollowersApi {

  constructor(private http: HttpClient) { }

  getFollowersPage(readerId: number, query: Query): Observable<PageResult> {

    return this.http.get(GET_FOLLOWERS_IDS(readerId, query),
      { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as PageResult));
  }

  getFollowingsPage(readerId: number, query: Query): Observable<PageResult> {

    return this.http.get(GET_FOLLOWINGS_IDS(readerId, query),
      { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as PageResult));
  }

  addFollower(model: AddFollower) {
    return this.http.post(ADD_FOLLOWER, JSON.stringify(model),
      { headers: DEFAULT_HEADERS() })
  }

  removeFollower(model: RemoveFollower) {
    return this.http.request('delete', REMOVE_FOLLOWER, { body: JSON.stringify(model), headers: DEFAULT_HEADERS() })
  }

  isFollowing(followingId: number) {
    return this.http.get(IS_FOLLOWING(followingId), { headers: DEFAULT_HEADERS() })
  }
}
