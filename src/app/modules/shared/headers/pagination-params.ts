import { HttpParams } from "@angular/common/http";
import { Query } from "../common/query";

export const PAGINATION_PARAMS = (query: Query) => {
  let params = new HttpParams();
  params = params.append('title', query.value);
  params = params.append('page', query.page.toString());
  params = params.append('count', query.count.toString());

  return params;
}
