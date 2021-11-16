import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BookcasePageQuery } from 'src/app/modules/bookcases/bookcase-pagination/models/bookcase-page.query';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { GET_BOOKCASE_COLLECTION } from './bookcase-pagination.urls';

@Injectable()
export class BookcasePaginationApi {

  constructor(private http: HttpClient) { }

  getBookcaseCollection(bookcaseId: number, query: BookcasePageQuery) {

    let params = new HttpParams();
    query.shelfIds.forEach(id => params = params.append('shelvesIds', JSON.stringify(id)));
    query.filteredBookIds.forEach(id => params = params.append('bookIds', JSON.stringify(id)));

    return this.http.get(GET_BOOKCASE_COLLECTION(bookcaseId, query.page, query.count, query.descending, query.sortType.value, query.title), { params: params, headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => response as PageResult));
  }
}
