import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CHANGE_AVATAR } from './avatar.urls';
import { ChangeAvatar } from './models/change-avatar.model';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class AvatarApi {

  constructor(private http: HttpClient) { }

  changeAvatar(model: ChangeAvatar) {
    return this.http.put(CHANGE_AVATAR, model, { headers: DEFAULT_HEADERS() });
  }
}
