import { createSelector } from "@ngrx/store";
import { manageUsersModuleState, ManageLibrarianModuleState } from "..";
import { PromotionWaitersState } from "./promotion-waiters.reducer";

const promotionWaitersState = createSelector(manageUsersModuleState, (state: ManageLibrarianModuleState) => {
  if (state) return state.promotionWaiters;

  return undefined;
});

export const getPromotionWaiters = (readerIds: number[]) => createSelector(promotionWaitersState, (state: PromotionWaitersState) => {
  if (state && readerIds) {
    const entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.filter(f => readerIds.includes(f.readerId));
  }

  return undefined;
});
