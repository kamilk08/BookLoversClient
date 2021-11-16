import { NavigationExtras, Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  readonly ['router']: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface RouterRoute {
  path: any[],
  query?: object;
  extras?: NavigationExtras
}
