import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { map } from 'rxjs/operators';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { LibrarianResponse } from '../responses/librarian.response';
import { LibrariansAdapter } from './librarians.adapter';
import { GET_LIBRARIANS_PAGE, GET_LIBRARIAN_BY_ID, GET_LIBRARIAN_BY_USER_GUID } from './librarians.urls';

@Injectable()
export class LibrariansApi {

  constructor(private http: HttpClient, private adapter: LibrariansAdapter) {

  }

  getLibrarianById(id: number) {
    return this.http.get(GET_LIBRARIAN_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response: LibrarianResponse) => this.adapter.adapt(response))
      );
  }

  getLibrarianByGuid(guid: UUID) {
    return this.http.get(GET_LIBRARIAN_BY_USER_GUID(guid), { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response: LibrarianResponse) => this.adapter.adapt(response)));
  }

  getLibrariansPage(ids: number[], page: number, count: number) {
    let params = new HttpParams();

    ids.map(id => params = params.append('ids', id.toString()));
    params = params.append('page', page.toString());
    params = params.append('count', count.toString());

    return this.http.get(GET_LIBRARIANS_PAGE, { params: params })
      .pipe(
        map((response: PageResult) => {
          return {
            librarians: response.items.map(item => this.adapter.adapt(item)),
            pageResult: response
          }
        })
      );
  }



}
