import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromIndex from '../index';
import * as fromSelectors from './series-web-page.selectors';
import { CHANGE_SERIES_PAGE_SORT_TYPE, CHNAGE_SERIES_PAGE_ORDER, NEXT_SERIES_BOOKS_PAGE, SET_BOOKS_COUNT_ON_SERIES_PAGE, SET_SERIES_ID, SET_SERIES_PAGE_SEARCH_PHRASE } from "./series-web-page.actions";
import { SortType } from "src/app/modules/shared/common/sort-type";

@Injectable()
export class SeriesWebPageFacade {

  public readonly seriesId$ = this.store.select(fromSelectors.seriesId);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);
  public readonly pageSize$ = this.store.select(fromSelectors.pageSize);
  public readonly searchPhrase$ = this.store.select(fromSelectors.searchPhrase);
  public readonly sortType$ = this.store.select(fromSelectors.sortType);
  public readonly descending$ = this.store.select(fromSelectors.sortOrder);

  constructor(private store: Store<fromIndex.SeriesModuleState>) { }

  setSeriesId(seriesId: number) {
    this.store.dispatch(SET_SERIES_ID({ payload: { seriesId } }))
  }

  setBooksCount(count: number) {
    this.store.dispatch(SET_BOOKS_COUNT_ON_SERIES_PAGE({ payload: { count } }));
  }

  setSearchPhrase(phrase: string) {
    this.store.dispatch(SET_SERIES_PAGE_SEARCH_PHRASE({ payload: { phrase } }))
  }

  changePage(page: number) {
    this.store.dispatch(NEXT_SERIES_BOOKS_PAGE({ payload: { page } }));
  }

  changeOrder(descending: boolean) {
    this.store.dispatch(CHNAGE_SERIES_PAGE_ORDER({ payload: { descending } }));
  }

  changeSortType(sortType: SortType) {
    this.store.dispatch(CHANGE_SERIES_PAGE_SORT_TYPE({ payload: { sortType } }));
  }
}
