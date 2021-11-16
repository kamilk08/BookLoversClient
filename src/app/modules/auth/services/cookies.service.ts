import { Injectable } from '@angular/core';

import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CookiesService {


  setCookie<T>(name: string, obj: T) {
    Cookie.set(name, JSON.stringify(obj), undefined, '/');
  }

  getFromCookie<T>(name: string): T {
    const token = Cookie.get(name);
    if (token === '')
      return null;

    return JSON.parse(token);
  }

  clearCookie(name: string) {
    Cookie.set(name, '', undefined, '/');
  }

  clearCookies() {
    Cookie.deleteAll();
  }


}
