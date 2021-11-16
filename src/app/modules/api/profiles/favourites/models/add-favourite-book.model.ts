import { UUID } from 'angular2-uuid';

export class AddFavouriteBook {
  public readonly bookGuid: UUID;
  public readonly profileGuid: UUID;
  public readonly addedAt: Date;

  constructor(bookGuid: UUID, profileGuid: UUID) {
    this.bookGuid = bookGuid;
    this.profileGuid = profileGuid;
    this.addedAt = new Date();
  }
}
