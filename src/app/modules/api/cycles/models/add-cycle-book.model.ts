import { UUID } from 'angular2-uuid';

export class AddCycleBook {

  public readonly cycleGuid: UUID;
  public readonly bookGuid: UUID;

  constructor(cycleGuid: UUID, bookGuid: UUID) {
    this.cycleGuid = cycleGuid;
    this.bookGuid = bookGuid;
  }
}
