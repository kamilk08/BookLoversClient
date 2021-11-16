import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EDIT_BOOK } from './edit-book.urls';
import { EditBookModel } from './models/edit-book.model';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class EditBookApi {

  constructor(private http: HttpClient) { }

  editBook(book: EditBookModel) {
    return this.http.put(EDIT_BOOK, book, { headers: DEFAULT_HEADERS() });
  }
}
