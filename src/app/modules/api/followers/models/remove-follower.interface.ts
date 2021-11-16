import { UUID } from 'angular2-uuid';
export class RemoveFollower {

  public readonly followedGuid: UUID;

  constructor(followedGuid: UUID) {
    this.followedGuid = followedGuid;
  }
}
