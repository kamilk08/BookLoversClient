import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { DEFAULT_HEADERS } from "src/app/modules/shared/headers/url.headers";

import * as fromUrls from '../remove/remove-book.url';

@Injectable()
export class RemoveBookApi {

  constructor(private http: HttpClient) {

  }

  removeBook(guid: UUID) {
    return this.http.request('DELETE', fromUrls.REMOVE_BOOK(guid), { headers: DEFAULT_HEADERS() })
  }

}
