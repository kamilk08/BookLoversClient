import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { START_BROWSING } from './browse.actions';
import { CHANGE_PAGE, REMOVE_CATEGORY, SELECT_CATEGORY, START_SEARCH } from './browse-page.actions';
import { BrowseCriteria } from '../../api/browse/models/browse-criteria.model';
import { SubCategory } from '../../api/books/models/sub-category.model';

import * as fromModule from './index';
import * as fromSelectors from './module.selectors';

@Injectable()
export class BrowseFacade {

  public readonly categories$ = this.store.select(fromSelectors.categories);

  public readonly titleForm$ = this.store.select(fromSelectors.titleForm);
  public readonly detailsForm$ = this.store.select(fromSelectors.detailsForm);

  public readonly processing$ = this.store.select(fromSelectors.processing);
  public readonly pageResult$ = this.store.select(fromSelectors.pageResult);

  public readonly items$ = this.store.select(fromSelectors.items);
  public readonly totalItems$ = this.store.select(fromSelectors.totalItems);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);

  public readonly browseCriteria$ = (page: number) => this.store.select(fromSelectors.browseCriteria(page));
  public readonly selectedCategories$ = this.store.select(fromSelectors.selectedCategories);

  constructor(private store: Store<fromModule.BrowseModuleState>) {
  }

  browseBooks(model: BrowseCriteria) {
    this.store.dispatch(START_BROWSING({ payload: { model } }));
  }

  search() {
    this.store.dispatch(START_SEARCH());
  }

  changePage(page: number) {
    this.store.dispatch(CHANGE_PAGE({ payload: { page } }))
  }

  selectCategory(subCategory: SubCategory, localIndex: number) {
    this.store.dispatch(SELECT_CATEGORY({ payload: { subCategory, localIndex } }));
  }

  removeCategory(id: number) {
    this.store.dispatch(REMOVE_CATEGORY({ payload: { id } }));
  }



}
