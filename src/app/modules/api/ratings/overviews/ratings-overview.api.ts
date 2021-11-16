import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ADD_BOOK_RATING, EDIT_BOOK_RATING, GET_BOOK_RATINGS_OVERVIEW, GET_MULTIPLE_OVERVIEWS, REMOVE_BOOK_RATING } from './ratings-overview.urls';
import { map, tap } from 'rxjs/operators';
import { RatingsOverviewAdapter } from './ratings-overview.adapter';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { AddRating } from 'src/app/modules/api/ratings/models/add-rating.model';
import { RemoveRating } from 'src/app/modules/api/ratings/models/remove-rating.model';
import { EditRating } from '../models/edit-rating.model';

@Injectable()
export class RatingsOverviewApi {

  constructor(private http: HttpClient, private adapter: RatingsOverviewAdapter) { }

  getOverview(bookId: number) {
    return this.http.get(GET_BOOK_RATINGS_OVERVIEW(bookId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)));
  }

  getMultipleOverviews(bookIds: number[]) {
    let params = new HttpParams();
    bookIds.forEach(id => params = params.append('bookIds', JSON.stringify(id)));

    return this.http.get(GET_MULTIPLE_OVERVIEWS, { headers: DEFAULT_HEADERS(), params: params })
      .pipe(
        map((response: any) => Array.from(response).map(item => this.adapter.adapt(item))))
  }

  addRating(model: AddRating) {
    return this.http.post(ADD_BOOK_RATING, model, { headers: DEFAULT_HEADERS() });
  }

  editRating(model: EditRating) {
    return this.http.put(EDIT_BOOK_RATING, model, { headers: DEFAULT_HEADERS() });
  }

  removeRating(model: RemoveRating) {
    return this.http.request('delete', REMOVE_BOOK_RATING, { headers: DEFAULT_HEADERS(), body: model });
  }
}
