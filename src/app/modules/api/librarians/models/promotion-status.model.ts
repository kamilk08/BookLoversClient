export class PromotionStatus {
  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }


  public static available:PromotionStatus = new PromotionStatus(1,'Available');
  public static promoted:PromotionStatus = new PromotionStatus(3,'Promoted');
  public static notAvailable:PromotionStatus = new PromotionStatus(2,'Not avaliable');
}

export const PROMOTION_STATUSES = [PromotionStatus.available,PromotionStatus.promoted,PromotionStatus.notAvailable];
