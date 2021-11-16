import { UUID } from 'angular2-uuid';

export class RemoveRating {

  public readonly bookGuid: UUID;

  constructor(bookGuid: UUID) {
    this.bookGuid = bookGuid
  }
}
