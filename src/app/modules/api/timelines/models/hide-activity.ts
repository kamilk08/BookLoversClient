import { UUID } from 'angular2-uuid';
export class HideActivity {

  public readonly timeLineObjectGuid: UUID;
  public readonly occuredAt: Date;
  public readonly activityTypeId: number

  constructor(activityObjectGuid: UUID, occuredAt: Date, activityTypeId: number) {
    this.timeLineObjectGuid = activityObjectGuid;
    this.occuredAt = occuredAt;
    this.activityTypeId = activityTypeId;
  }

}
