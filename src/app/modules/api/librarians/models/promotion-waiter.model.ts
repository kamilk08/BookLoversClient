import { UUID } from "angular2-uuid";
import { Identification } from "src/app/modules/shared";
import { PromotionStatus } from "./promotion-status.model";

export class PromotionWaiter {
  readonly identification: Identification;
  readonly readerGuid: UUID;
  readonly readerId: number;
  promotionStatus: PromotionStatus;

  constructor(identification: Identification, reader: { id: number, guid: UUID }, promotionStatus: PromotionStatus) {
    this.identification = identification;
    this.readerGuid = reader.guid;
    this.readerId = reader.id;
    this.promotionStatus = promotionStatus;
  }

  setStatus(status: PromotionStatus) {
    this.promotionStatus = status;
  }

  isPromoted() {
    return this.promotionStatus.id === PromotionStatus.promoted.id;
  }

  waitingForPromotion() {
    return this.promotionStatus.id === PromotionStatus.available.id;
  }
}
