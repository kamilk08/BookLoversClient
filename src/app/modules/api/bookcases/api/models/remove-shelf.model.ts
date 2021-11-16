import { UUID } from 'angular2-uuid';

export class RemoveShelf {

  public readonly bookcaseGuid: UUID;
  public readonly shelfGuid: UUID;

  constructor(bookcaseGuid: UUID, shelfGuid: UUID) {
    this.bookcaseGuid = bookcaseGuid;
    this.shelfGuid = shelfGuid;
  }
}
