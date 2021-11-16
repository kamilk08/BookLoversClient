import { Adapter, Identification } from "src/app/modules/shared";
import { PROMOTION_STATUSES } from "../models/promotion-status.model";
import { PromotionWaiter } from "../models/promotion-waiter.model";

export class PromotionWaiterAdadpter implements Adapter<PromotionWaiter>{
  adapt(item: any): PromotionWaiter {

    const identification: Identification = {
      id: item.id,
      guid: item.guid
    };
    const reader = {
      id: item.readerId,
      guid: item.readerGuid
    };
    const promotionStatus = PROMOTION_STATUSES.find(f => f.id === item.promotionStatus);

    const promotionWaiter: PromotionWaiter = new PromotionWaiter(identification, reader, promotionStatus);

    return promotionWaiter;
  }

}
