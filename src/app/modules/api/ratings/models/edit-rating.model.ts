import { UUID } from 'angular2-uuid';

export class EditRating {

  public readonly bookGuid: UUID;
  public readonly stars: number;

  constructor(bookGuid: UUID, stars: number) {
    this.bookGuid = bookGuid;
    this.stars = stars;
  }
}
