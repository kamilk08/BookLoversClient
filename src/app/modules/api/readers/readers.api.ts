import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReaderAdapter } from './reader.adapter';
import { GET_READER_BY_ID, GET_READER_BY_GUID, SEARCH_READER } from './reader.urls';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import { Reader } from './models/reader.model';
import { Subject } from 'rxjs';

@Injectable()
export class ReadersApi {

  constructor(private http: HttpClient, private adapter: ReaderAdapter) { }

  getReader(readerId: number): Observable<Reader> {
    return this.http.get(GET_READER_BY_ID(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(
        map(response => this.adapter.adapt(response))
      )
  }

  getReaderByGuid(guid: UUID): Observable<Reader> {
    return this.http.get(GET_READER_BY_GUID(guid), { headers: DEFAULT_HEADERS() })
      .pipe(
        map(response => this.adapter.adapt(response))
      )
  }

  searchReaders(query: Query) {
    return this.http.get(SEARCH_READER(query), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: PageResult) => {
        return {
          readers: response.items.map(item => this.adapter.adapt(item)),
          pageResult: response
        }
      }));
  }



}
