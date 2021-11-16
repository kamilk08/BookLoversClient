import { AddLibrarianEffects } from "./store/add-librarian/add-librarian.effects";
import { DegradeLibrarianEffects } from "./store/degrade-librarian/degrade-librarian.effects";
import { PromotionWaitersPaginationEffects } from "./store/promotion-waiters/promotion-waiters-pagination.effects";

export const effects: any[] = [
  AddLibrarianEffects,
  DegradeLibrarianEffects,
  PromotionWaitersPaginationEffects
]
