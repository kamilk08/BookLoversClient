import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { REMOVE_AUTHOR } from './remove-author.urls';

@Injectable()
export class RemoveAuthorApi {

  constructor(private http: HttpClient) {
  }

  removeAuthor(guid: UUID) {
    return this.http.delete(REMOVE_AUTHOR(guid), { headers: DEFAULT_HEADERS() })
  }
}
