import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SIGN_IN } from './sign-in.urls';
import { Credentials } from './models/credentials.model';
import { UrlHeaders } from 'src/app/modules/shared/headers/url.headers';
import { JsonToken } from 'src/app/modules/api/auth/refreshing-tokens/models/json-token.model';

@Injectable()
export class SignInApi {

  constructor(private http: HttpClient) { }

  signIn(credentials: Credentials): Observable<JsonToken> {
    let headers = UrlHeaders.urlEncodedWithAuthorization();
    let body = this.signInBody(credentials);

    return this.http.post(SIGN_IN, body, { headers: headers, withCredentials: true })
      .pipe(map(response => response as JsonToken));
  }

  private signInBody(credentials: any) {
    return "username=" + credentials.email + "&password=" + encodeURIComponent(credentials.password) + "&grant_type=password";
  }

}
