import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UrlHeaders } from 'src/app/modules/shared/headers/url.headers';
import { JsonToken } from './models/json-token.model';
import { refreshTokenParams } from './refresh-token-params';
import { REFRESH_TOKEN } from './token-refresh.urls';

@Injectable()
export class TokenRefreshApi {

  constructor(private http: HttpClient) {

  }

  refresh(refreshToken: string): Observable<JsonToken> {

    const headers = UrlHeaders.urlEncoded();
    const params = refreshTokenParams(refreshToken);

    return this.http.post(REFRESH_TOKEN, params, { headers: headers })
      .pipe(map(response => response as JsonToken))
  }
}
