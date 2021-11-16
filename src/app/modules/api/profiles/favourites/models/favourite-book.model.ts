import { UUID } from 'angular2-uuid';

export class FavouriteBook {

  public readonly bookGuid: UUID;

  constructor(bookGuid: UUID) {
    this.bookGuid = bookGuid;
  }

}
