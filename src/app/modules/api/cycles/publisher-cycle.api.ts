import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PublisherCycleAdapter } from './publisher-cycle.adapter';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromUrls from './publisher-cycle.urls';
import { AddPublisherCycleResponse } from './responses/add-publisher-cycle.response';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { PublisherCycle } from './models/publisher-cycle.model';
import { AddCycleBook } from './models/add-cycle-book.model';
import { AddPublisherCycle } from './models/add-publisher-cycle.model';
import { RemoveCycleBook } from './models/remove-cycle-book.model';
import { Query } from '../../shared/common/query';
import { PageResult } from '../../shared/common/page-result';

@Injectable()
export class PublisherCycleApi {

  constructor(private http: HttpClient, private adapter: PublisherCycleAdapter) { }

  getPublisherCycleById(id: number): Observable<PublisherCycle> {
    return this.http.get(fromUrls.GET_PUBLISHER_CYCLE_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getPublisherCycleByName(name: string) {
    return this.http.get(fromUrls.GET_PUBLISHER_CYCLE_BY_NAME(name), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getPublisherCycles(publisherCycles: number[], query: Query) {

    let params = new HttpParams();
    params = params.append('page', query.page.toString());
    params = params.append('count', query.count.toString());

    publisherCycles.forEach(id => params = params.append("cyclesIds", JSON.stringify(id)));

    return this.http.get(fromUrls.GET_MULTIPLE_PUBLISHER_CYCLES, { params: params, headers: DEFAULT_HEADERS() })
      .pipe(map((response: PageResult) => Array.from(response.items).map(cycle => this.adapter.adapt(cycle))))
  }

  addPublisherCycle(model: AddPublisherCycle) {
    return this.http.post(fromUrls.ADD_PUBLISHER_CYCLE, model, { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as AddPublisherCycleResponse));
  }

  addCycleBook(model: AddCycleBook) {
    return this.http.put(fromUrls.ADD_CYCLE_BOOK, model, { headers: DEFAULT_HEADERS() })
  }

  removeCycleBook(model: RemoveCycleBook) {
    return this.http.request('delete', fromUrls.REMOVE_CYCLE_BOOK, { body: model, headers: DEFAULT_HEADERS() });
  }

  findPublisherCycle(query: Query): Observable<PublisherCycle[]> {
    return this.http.get(fromUrls.FIND_PUBLISHER_CYCLE(query.value, query.page, query.count), { headers: DEFAULT_HEADERS() })
      .pipe(map(this.mapPaginatedPublisherCycles))
  }

  private mapPaginatedPublisherCycles = (response: any) => Array.from(response.items).map(i => this.adapter.adapt(i));
}
