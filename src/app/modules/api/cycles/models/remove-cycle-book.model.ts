import { UUID } from 'angular2-uuid';

export class RemoveCycleBook {

  public readonly cycleGuid: UUID
  public readonly bookGuid: UUID

  constructor(cycleGuid: UUID, bookGuid: UUID) {
    this.cycleGuid = cycleGuid;
    this.bookGuid = bookGuid;
  }

}
