import { UUID } from 'angular2-uuid';

export class FavouriteAuthor {

  public readonly authorGuid: UUID;

  constructor(guid: UUID) {
    this.authorGuid = guid;
  }

}
