import { UUID } from 'angular2-uuid';

export class IssuedBy {
  public readonly ticketOwnerId: number;
  public readonly ticketOwnerGuid: UUID;

  constructor(ticketOwnerId: number, ticketOwnerGuid: UUID) {
    this.ticketOwnerId = ticketOwnerId;
    this.ticketOwnerGuid = ticketOwnerGuid;
  }
}
