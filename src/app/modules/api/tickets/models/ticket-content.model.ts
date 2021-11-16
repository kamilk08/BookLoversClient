import { UUID } from 'angular2-uuid';
import { TicketConcern, TICKET_CONCERNS } from './ticket-concern.model';

export class TicketContent {
  public readonly ticketObjectGuid: UUID;
  public readonly content: string;
  public readonly ticketConcern: TicketConcern;

  constructor(ticketObjectGuid: UUID, content: string, concernId: number) {
    this.ticketObjectGuid = ticketObjectGuid;
    this.content = content;
    this.ticketConcern = TICKET_CONCERNS.find(f => f.value === concernId);
  }

  public static bookTicketContent(ticketObjectGuid: UUID, content: string) {
    return new TicketContent(ticketObjectGuid, content, TicketConcern.book().value);
  }

  public static authorTicketContent(ticketObjectGuid: UUID, content: string) {
    return new TicketContent(ticketObjectGuid,content,TicketConcern.author().value);
  }

}
