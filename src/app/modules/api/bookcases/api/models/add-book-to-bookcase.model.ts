import { UUID } from 'angular2-uuid';

export class AddToBookcase {

  public readonly bookGuid: UUID;
  public readonly bookcaseGuid: UUID;
  public readonly shelfGuid: UUID;

  constructor(bookGuid:UUID,bookcaseGuid:UUID,shelfGuid:UUID){
    this.bookGuid = bookGuid;
    this.bookcaseGuid = bookcaseGuid;
    this.shelfGuid = shelfGuid;
  }
}
