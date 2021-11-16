import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { Bookcase, Shelf } from "../../models";

import * as fromIndex from '../index';
import * as fromSelectors from '../page/bookcase-page.selectors';
import { ADD_OR_REMOVE_SHELF_ON_BOOKCASE_PAGE, CHANGE_BOOKCASE_COLLECTION_PAGE, OPEN_READED_SHELF_MODAL, OPEN_REMOVE_BOOK_FROM_BOOKCASE_MODAL, RESET_BOOKCASE_PAGE, SET_BOOKCASE_READER_ID, SET_CURRENT_BOOKIDS_ON_BOOKCASE_PAGE, SET_PAGE_BOOKCASE, SET_SEARCH_PHRASE_ON_BOOKCASE_PAGE, SET_SORT_ORDER_ON_BOOKCASE_PAGE, SET_SORT_TYPE_ON_BOOKCASE_PAGE, TOGGLE_SEARCH_BAR } from "./bookcase-page.actions";

@Injectable()
export class BookcasePageFacade {

  public readonly readerId$ = this.store.select(fromSelectors.readerId);
  public readonly currentBookcase$ = this.store.select(fromSelectors.currentBookcase);
  public readonly currentBookIds$ = this.store.select(fromSelectors.currentBookIds);

  public readonly selectedShelves$ = this.store.select(fromSelectors.selectedShelves);

  public readonly sortType$ = this.store.select(fromSelectors.sortType);
  public readonly descending$ = this.store.select(fromSelectors.sortOrder);
  public readonly searchPhrase$ = this.store.select(fromSelectors.searchPhrase)

  public readonly showSearchBar$ = this.store.select(fromSelectors.showSearchBar);


  constructor(private store: Store<fromIndex.BookcaseModuleState>) {
  }

  setBookcaseReaderId(readerId: number) {
    this.store.dispatch(SET_BOOKCASE_READER_ID({ payload: { readerId } }));
  }

  setPageBookcase(bookcase: Bookcase) {
    this.store.dispatch(SET_PAGE_BOOKCASE({ payload: { bookcase } }));
  }

  setCurrentBookIds(bookIds: number[], sendHttpRequests: boolean) {
    this.store.dispatch(SET_CURRENT_BOOKIDS_ON_BOOKCASE_PAGE({ payload: { bookIds, sendHttpRequests } }))
  }

  setSortType(sortType: SortType) {
    this.store.dispatch(SET_SORT_TYPE_ON_BOOKCASE_PAGE({ payload: { sortType } }));
  }

  setSortOrder(descending: boolean) {
    this.store.dispatch(SET_SORT_ORDER_ON_BOOKCASE_PAGE({ payload: { descending } }));
  }

  setSearchPhrase(phrase: string) {
    this.store.dispatch(SET_SEARCH_PHRASE_ON_BOOKCASE_PAGE({ payload: { phrase } }));
  }

  addOrRemoveShelf(shelf: Shelf) {
    this.store.dispatch(ADD_OR_REMOVE_SHELF_ON_BOOKCASE_PAGE({ payload: { shelf } }));
  }

  changeBookcaseCollectionPage(page: number) {
    this.store.dispatch(CHANGE_BOOKCASE_COLLECTION_PAGE({ payload: { page } }));
  }

  openRemoveBookFromBookcaseModal(book: Book) {
    this.store.dispatch(OPEN_REMOVE_BOOK_FROM_BOOKCASE_MODAL({ payload: { book } }));
  }

  openReadedShelfModal(book: Book) {
    this.store.dispatch(OPEN_READED_SHELF_MODAL({ payload: { book } }));
  }

  toggleSearchBar(flag: boolean) {
    this.store.dispatch(TOGGLE_SEARCH_BAR({ payload: { flag } }));
  }

  reset() {
    this.store.dispatch(RESET_BOOKCASE_PAGE());
  }

}
