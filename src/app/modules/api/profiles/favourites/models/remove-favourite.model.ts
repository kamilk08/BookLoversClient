import { UUID } from 'angular2-uuid';

export class RemoveFavourite {
  public readonly profileGuid: UUID
  public readonly favouriteGuid: UUID

  constructor(profileGuid: UUID, favouriteGuid: UUID) {
    this.profileGuid = profileGuid;
    this.favouriteGuid = favouriteGuid;
  }
}
