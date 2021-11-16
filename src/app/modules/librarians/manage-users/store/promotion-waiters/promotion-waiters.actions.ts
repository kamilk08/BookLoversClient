import { createAction, props } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { PromotionStatus } from "src/app/modules/api/librarians/models/promotion-status.model";
import { PromotionWaiter } from "src/app/modules/api/librarians/models/promotion-waiter.model";

export const FETCH_PROMOTION_WAITERS = createAction('[MANAGE_LIBRARIANS] Fetch promotion waiters', props<{ payload: { entities: PromotionWaiter[] } }>());
export const UPDATE_PROMOTION_WAITER = createAction('[MANAGE_LIBRARIANS] Update promotion watier', props<{ payload: { readerGuid: UUID, status: PromotionStatus } }>())
