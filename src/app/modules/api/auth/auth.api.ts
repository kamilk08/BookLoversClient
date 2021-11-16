import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CHANGE_PASSWORD, CHANGE_EMAIL, BLOCK_ACCOUNT } from './auth.urls';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { BlockAccount } from './models/block-account.model';
import { ChangeEmail } from './models/change-email.model';
import { ChangePassword } from './models/change-password.model';

@Injectable()
export class AuthApi {

  constructor(private http: HttpClient) {
  }

  changeEmail(model: ChangeEmail) {

    const body = { password: model.password, nextEmail: model.nextEmail, email: model.email };

    return this.http.put(CHANGE_EMAIL,
      JSON.stringify(body), { headers: DEFAULT_HEADERS() });
  }

  changePassword(model: ChangePassword) {
    return this.http.put(CHANGE_PASSWORD, JSON.stringify(model), { headers: DEFAULT_HEADERS() });
  }

  blockAccount(model: BlockAccount) {
    return this.http.request('delete', BLOCK_ACCOUNT, { headers: DEFAULT_HEADERS(), body: JSON.stringify(model) });
  }

}
