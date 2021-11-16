import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { AddAuthorModel } from './models/add-author.model';
import { ADD_AUTHOR } from './add-author.urls';

@Injectable()
export class AddAuthorApi {

  constructor(private http: HttpClient) { }

  addAuthor(model: AddAuthorModel) {
    return this.http.post(ADD_AUTHOR, model, { headers: DEFAULT_HEADERS() });
  }
}
