import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditAuthorModel } from 'src/app/modules/api/authors/edit-author/models/edit-author.model';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { EDIT_AUTHOR } from './edit-author.urls';

@Injectable()
export class EditAuthorApi {

  constructor(private http: HttpClient) {

  }

  editAuthor(model: EditAuthorModel) {
    return this.http.put(EDIT_AUTHOR, model, { headers: DEFAULT_HEADERS() });
  }
}
