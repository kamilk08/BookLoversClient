import { HttpClient } from '@angular/common/http';
import { BookcaseAdapter } from './bookcase.adapter';
import { Injectable } from '@angular/core';
import { ADD_SHELF, ADD_TO_BOOKCASE, CHANGE_BOOKS_SHELF, EDIT_SHELF_NAME, GET_BOOKCASE, GET_BOOKCASE_BY_USER_ID, REMOVE_FROM_BOOKCASE, REMOVE_FROM_SHELF, REMOVE_SHELF } from './bookcase.urls';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookcaseResponse } from './responses/bookcase.response';
import { AddToBookcase } from './models/add-book-to-bookcase.model';
import { AddCustomShelf } from './models/add-custom-shelf.model';
import { AddShelfResponse } from './responses/add-shelf.response';
import { Bookcase } from 'src/app/modules/bookcases/models';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { ChangeShelf } from './models/change-shelf.model';
import { EditShelfName } from './models/edit-shelf-name.model';
import { RemoveFromShelf } from './models/remove-from-shelf.model';
import { RemoveFromBookcase } from './models/remove-from-bookcase.model';
import { RemoveShelf } from './models/remove-shelf.model';

@Injectable()
export class BookcaseApi {

  constructor(private http: HttpClient, private adapter: BookcaseAdapter) {
  }

  getBookcaseById(id: number): Observable<Bookcase> {
    return this.http.get(GET_BOOKCASE(id), { headers: DEFAULT_HEADERS() })
      .pipe(map((response) => this.adapter.adapt(response)))
  }


  getBookcaseByUserId(readerId: number) {
    return this.http.get(GET_BOOKCASE_BY_USER_ID(readerId),
      { headers: DEFAULT_HEADERS() })
      .pipe(map((response: BookcaseResponse) => this.adapter.adapt(response)))
  }

  addBookToBookcase(model: AddToBookcase): Observable<Object> {
    return this.http.post(ADD_TO_BOOKCASE, model, { headers: DEFAULT_HEADERS() });
  }

  addShelf(model: AddCustomShelf): Observable<AddShelfResponse> {
    return this.http.post(ADD_SHELF, model, { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response) => response as AddShelfResponse)
      );
  }

  changeShelf(model: ChangeShelf) {
    return this.http.put(CHANGE_BOOKS_SHELF, model, { headers: DEFAULT_HEADERS() });
  }

  editShelfsName(model: EditShelfName) {
    return this.http.put(EDIT_SHELF_NAME, model, { headers: DEFAULT_HEADERS() });
  }

  removeFromShelf(model: RemoveFromShelf) {
    return this.http.request('delete', REMOVE_FROM_SHELF, { body: model, headers: DEFAULT_HEADERS() });
  }

  removeFromBookcase(model: RemoveFromBookcase) {
    return this.http.request('delete', REMOVE_FROM_BOOKCASE, { body: model, headers: DEFAULT_HEADERS() });
  }

  removeShelf(model: RemoveShelf) {
    return this.http.request('delete', REMOVE_SHELF,
      { body: model, headers: DEFAULT_HEADERS() });
  }

}
