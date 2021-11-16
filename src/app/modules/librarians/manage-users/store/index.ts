import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromAddLibrarian from './add-librarian/add-librarian.reducer';
import * as fromDegradeLibrarian from './degrade-librarian/degrade-librarian.reducer';
import * as fromPromotionWaiters from './promotion-waiters/promotion-waiters.reducer';
import * as fromPromotionWaitersPagination from './promotion-waiters/promotion-waiters-pagination.reducer';

export interface ManageLibrarianModuleState {
  addLibrarianState: fromAddLibrarian.AddLibrarianState,
  degradeLibrarianState: fromDegradeLibrarian.DegradeLibrarianState,
  promotionWaiters: fromPromotionWaiters.PromotionWaitersState,
  promotionWaitersPagination:fromPromotionWaitersPagination.PromotionWaitersPaginationState
}

const reducerMap: ActionReducerMap<ManageLibrarianModuleState> = {
  addLibrarianState: fromAddLibrarian.addLibrarianReducer,
  degradeLibrarianState: fromDegradeLibrarian.degradeLibrarianReducer,
  promotionWaiters: fromPromotionWaiters.promotionWaitersReducer,
  promotionWaitersPagination: fromPromotionWaitersPagination.promotionWaitersPaginationReducer
};

const reducer = combineReducers(reducerMap);

export function manageLibrarianModuleReducer(state: ManageLibrarianModuleState, action: Action) {
  return reducer(state, action);
}

export const manageUsersModuleState = createFeatureSelector('manage-librarian');
