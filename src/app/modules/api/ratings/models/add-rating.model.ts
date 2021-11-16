import { UUID } from 'angular2-uuid';

export class AddRating {

  public readonly bookcaseGuid: UUID;
  public readonly bookGuid: UUID;
  public readonly stars: number;

  constructor(bookcaseGuid: UUID, bookGuid: UUID, stars: number) {
    this.bookcaseGuid = bookcaseGuid;
    this.bookGuid = bookGuid;
    this.stars = stars;
  }
}
