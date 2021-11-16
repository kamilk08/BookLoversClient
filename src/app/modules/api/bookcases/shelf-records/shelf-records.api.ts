import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GET_RECORD_SHELF, GET_MULTIPLE_SHELF_RECORDS } from './shelf-records.urls';
import { map } from 'rxjs/operators';
import { ShelfRecordAdapter } from './shelf-record.adapter';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';

@Injectable()
export class ShelfRecordApi {

  constructor(private http: HttpClient, private adapter: ShelfRecordAdapter) { }

  getShelfRecord(shelfId: number, bookId: number) {
    return this.http.get(GET_RECORD_SHELF(shelfId, bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => this.adapter.adapt(response)))

  }

  getMultipleShelfRecords(bookIds: number[], bookcaseId: number) {
    let params = new HttpParams()

    bookIds.forEach(bookId => params = params.append('bookIds', JSON.stringify(bookId)));

    return this.http.get(GET_MULTIPLE_SHELF_RECORDS(bookcaseId), { params: params })
      .pipe(map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))))
  }
}
