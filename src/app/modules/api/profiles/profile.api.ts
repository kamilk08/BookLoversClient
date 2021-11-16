import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_PROFILE, CHANGE_PROFILE } from './profile.urls';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileAdapter } from './profile.adapter';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { Profile } from './models/profile.model';
import { EditProfileModel } from './models/edit-proflie.model';

@Injectable()
export class ProfileApi {

  constructor(private http: HttpClient, private profileAdapter: ProfileAdapter) { }

  getProfile(userId: number): Observable<Profile> {
    return this.http.get(GET_PROFILE(userId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.profileAdapter.adapt(response)))
  }

  changeProfile(profile: EditProfileModel) {
    return this.http.put(CHANGE_PROFILE, profile, { headers: DEFAULT_HEADERS() })
  }
}
