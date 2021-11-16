import { HttpClient } from '@angular/common/http';
import { ADD_NEW_BOOK } from './add-book.urls';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddBookResponse } from './responses/add-book.response';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { AddNewBook } from './models/add-book.model';

@Injectable()
export class AddBookApi {

  constructor(private http: HttpClient) { }

  addBook(model: AddNewBook) {

    return this.http.post(ADD_NEW_BOOK, model, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as AddBookResponse))
  }
}
