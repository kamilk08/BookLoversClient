import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { CHANGE_PUBLISHER_BOOKS_ORDER, CHANGE_PUBLISHER_BOOKS_SORT_TYPE, NEXT_PUBLISHER_BOOKS_PAGE, RESET_PUBLISHER_PAGE, SELECT_PAGE_PUBLISHER, SET_SEARCH_PHRASE, TOGGLE_PUBLISHER_PAGE_SPINNER } from "./publisher-page.actions";
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';
@Injectable()
export class PublisherPageFacade {

  public readonly sortOrder$ = this.store.select(fromSelectors.descending);
  public readonly sortType$ = this.store.select(fromSelectors.sortType);
  public readonly searchPhrase$ = this.store.select(fromSelectors.searchPhrase);

  public readonly publisherId$ = this.store.select(fromSelectors.publisherId)

  public readonly booksCount$ = this.store.select(fromSelectors.booksCount);

  constructor(private readonly store: Store<fromModule.PublishersModuleState>) { }

  changePage(page: number) {
    this.store.dispatch(NEXT_PUBLISHER_BOOKS_PAGE({ payload: { page } }));
  }

  changeOrder(descending: boolean) {
    this.store.dispatch(CHANGE_PUBLISHER_BOOKS_ORDER({ payload: { descending } }))
  }

  changeSortType(sortType: SortType) {
    this.store.dispatch(CHANGE_PUBLISHER_BOOKS_SORT_TYPE({ payload: { sortType } }))
  }

  searchPhrase(phrase: string) {
    this.store.dispatch(SET_SEARCH_PHRASE({ payload: { phrase } }))
  }

  setPublisherId(id: number) {
    this.store.dispatch(SELECT_PAGE_PUBLISHER({ payload: { id } }));
  }

  toggleSpinner(show: boolean) {
    this.store.dispatch(TOGGLE_PUBLISHER_PAGE_SPINNER({ payload: { show } }));
  }

  reset() {
    this.store.dispatch(RESET_PUBLISHER_PAGE());
  }
}
