import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { FOLLOW_AUTHOR, UNFOLLOW_AUTHOR } from './author-followers.urls';

@Injectable()
export class AuthorFollowersApi {

  constructor(private http: HttpClient) { }

  followAuthor(authorGuid: UUID) {
    return this.http.post(FOLLOW_AUTHOR(authorGuid), null, { headers: DEFAULT_HEADERS() });
  }

  unFollowAuthor(authorGuid: UUID) {
    return this.http.delete(UNFOLLOW_AUTHOR(authorGuid), { headers: DEFAULT_HEADERS() });
  }
}
