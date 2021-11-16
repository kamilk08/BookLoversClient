import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VERIFY_ACCOUNT } from './verify-account.urls';
import { VerifyAccount } from './models/account-verification.model';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class VerifyAccountApi {

  constructor(private client: HttpClient) { }

  verifyAccount(verifyAccount: VerifyAccount) {
    return this.client.put(VERIFY_ACCOUNT(verifyAccount), {},
      { headers: DEFAULT_HEADERS() });
  }
}
