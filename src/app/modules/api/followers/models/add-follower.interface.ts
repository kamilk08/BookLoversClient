import { UUID } from 'angular2-uuid';
export class AddFollower {

  public readonly followedGuid: UUID;

  constructor(followedGuid: UUID) {
    this.followedGuid = followedGuid;
  }
}
