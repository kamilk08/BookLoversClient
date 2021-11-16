import { createSelector } from "@ngrx/store";
import { manageUsersModuleState, ManageLibrarianModuleState } from "..";
import { PromotionWaitersPaginationState } from "./promotion-waiters-pagination.reducer";

const promotionWaitersPaginationState = createSelector(manageUsersModuleState, (state: ManageLibrarianModuleState) => {
  if (state) return state.promotionWaitersPagination;

  return undefined;
});

export const promotionWaitersPage = createSelector(promotionWaitersPaginationState, (state: PromotionWaitersPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});
export const processingPromotionWaitersPage = createSelector(promotionWaitersPaginationState, (state: PromotionWaitersPaginationState) => {
  if (state) return state.processing;

  return undefined;
});
