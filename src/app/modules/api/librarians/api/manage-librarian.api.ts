import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { map } from 'rxjs/operators';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { AddLibrarianModel } from '../models/add-librarian.model';
import { AddLibrarianResponse } from '../responses/add-librarian.response';
import { CREATE_LIBRARIAN, DEGRADE_LIBRARIAN, GET_PROMOTIONS_PAGE } from './manage-librarians.urls';
import { PromotionWaiterAdadpter } from './promotion-waiter.adapter';

@Injectable()
export class ManageLibrarianApi {

  constructor(private http: HttpClient, private adapter: PromotionWaiterAdadpter) {
  }

  getPromotionsPage(ids: number[], query: Query) {

    let params = new HttpParams();
    ids.map(id => params = params.append('ids', id.toString()));
    params = params.append('page', query.page.toString());
    params = params.append('count', query.count.toString());

    return this.http.get(GET_PROMOTIONS_PAGE, { params: params })
      .pipe(
        map((response: PageResult) => {
          return {
            promotionWaiters: response.items.map(item => this.adapter.adapt(item)),
            pageResult: response
          }
        })
      );

  }

  createLibrarian(model: AddLibrarianModel) {
    return this.http.post(CREATE_LIBRARIAN, JSON.stringify(model), { headers: DEFAULT_HEADERS() })
      .pipe(map((response) => response as AddLibrarianResponse));
  }

  degradeLibrarian(guid: UUID) {
    return this.http.delete(DEGRADE_LIBRARIAN(guid), { headers: DEFAULT_HEADERS() });
  }

}
