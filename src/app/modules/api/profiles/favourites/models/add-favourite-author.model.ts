import { UUID } from 'angular2-uuid';

export class AddFavouriteAuthor {
  public readonly profileGuid: UUID;
  public readonly authorGuid: UUID;
  public readonly addedAt: Date;

  constructor(profileGuid: UUID, authorGuid: UUID) {
    this.profileGuid = profileGuid;
    this.authorGuid = authorGuid;
    this.addedAt = new Date();
  }
}
