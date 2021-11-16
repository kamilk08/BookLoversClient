import { UUID } from 'angular2-uuid';

export class RemoveFromShelf {

  public readonly bookcaseGuid: UUID
  public readonly shelfGuid: UUID;
  public readonly bookGuid: UUID;

  constructor(bookcaseGuid: UUID, shelfGuid: UUID, bookGuid: UUID) {
    this.bookcaseGuid = bookcaseGuid;
    this.shelfGuid = shelfGuid;
    this.bookGuid = bookGuid;
  }
}
