import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { AddLibrarianModel } from 'src/app/modules/api/librarians/models/add-librarian.model';
import { Query } from 'src/app/modules/shared/common/query';
import { ADD_LIBRARIAN } from './add-librarian/add-librarian.actions';
import { DEGRADE_LIBRARIAN } from './degrade-librarian/degrade-librarian.actions';
import { SELECT_PROMOTION_WAITERS_PAGE } from './promotion-waiters/promotion-waiters-pagination.actions';
import * as fromIndex from './index';
import * as fromSelectors from '../module.selectors';


@Injectable()
export class ManageLibrarianFacade {

  public readonly processingPromotionWaitersPage$ = this.store.select(fromSelectors.processingPromotionWaitersPage);
  public readonly promotionWaitersPage$ = this.store.select(fromSelectors.promotionWaitersPage);
  public readonly getPromotionWaiters$ = (ids: number[]) => this.store.select(fromSelectors.getPromotionWaiters(ids));

  public readonly processingNewLibrarian$ = this.store.select(fromSelectors.processingNewLibrarian);
  public readonly model$ = this.store.select(fromSelectors.newLibrarianModel);

  public readonly degradingLibrarian$ = this.store.select(fromSelectors.degradingLibrarian);

  constructor(private store: Store<fromIndex.ManageLibrarianModuleState>) {

  }

  createLibrarian(model: AddLibrarianModel) {
    this.store.dispatch(ADD_LIBRARIAN({ payload: { model } }));
  }

  degradeLibrarian(guid: UUID) {
    this.store.dispatch(DEGRADE_LIBRARIAN({ payload: { readerGuid: guid } }))
  }

  selectPromotionWaitersPage(ids: number[], query: Query) {
    this.store.dispatch(SELECT_PROMOTION_WAITERS_PAGE({ payload: { ids, query } }));
  }
}
