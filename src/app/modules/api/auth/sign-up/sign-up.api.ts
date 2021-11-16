import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from './models/sign-up.model';
import { IS_EMAIL_UNIQUE, IS_USERNAME_UNIQUE, SIGN_UP } from './sign-up.urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class SignUpApi {

  constructor(private http: HttpClient) { }

  signUp(model: SignUpModel) {
    return this.http.post(SIGN_UP, JSON.stringify(model), { headers: DEFAULT_HEADERS() });
  }

  isEmailUnique(email: string): Observable<boolean> {
    return this.http.get(IS_EMAIL_UNIQUE(email), { headers: DEFAULT_HEADERS() }).pipe(map(response => response as boolean));
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return this.http.get(IS_USERNAME_UNIQUE(username), { headers: DEFAULT_HEADERS() }).pipe(map(response => response as boolean));
  }
}
