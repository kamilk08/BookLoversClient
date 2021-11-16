import { UUID } from 'angular2-uuid';
import { Decision } from './decision.model';
import { IssuedBy } from './issued-by.model';
import { SolvedBy } from './solved-by.model';
import { TicketContent } from './ticket-content.model';
import { TicketState } from './ticket-state.model';
import { Ticket } from './ticket.model';

export class AddTicketModel {
  public ticketId: number
  public readonly ticketObjectGuid: UUID;
  public readonly ticketGuid: UUID;
  public readonly title: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly ticketConcern: number;
  public readonly ticketData: string;

  constructor(ticketObject: { guid: UUID, data: string }, ticketAddons: {
    title: string,
    description: string, concern: number
  }) {
    this.ticketObjectGuid = ticketObject.guid;
    this.ticketGuid = UUID.UUID();
    this.title = ticketAddons.title;
    this.description = ticketAddons.description;
    this.ticketConcern = ticketAddons.concern
    this.ticketData = ticketObject.data;
    this.createdAt = new Date();
  }

  setTicketId(id: number) {
    this.ticketId = id;
  }

  toTicket(ticketOwnerId: number, ticketOwnerGuid: UUID) {
    const content = new TicketContent(this.ticketObjectGuid, this.ticketData, this.ticketConcern);
    const issuedBy = new IssuedBy(ticketOwnerId, ticketOwnerGuid);

    const ticket = new Ticket(this.title, content, Decision.unknown(), new SolvedBy(undefined), issuedBy, TicketState.inProgress());
    ticket.setIdentification({ id: this.ticketId, guid: this.ticketGuid });

    return ticket;
  }

}
