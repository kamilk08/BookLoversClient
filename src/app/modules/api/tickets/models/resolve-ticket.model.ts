import { UUID } from "angular2-uuid";

export class ResolveTicket {
  public ticketId: number
  public librarianGuid: UUID;
  public ticketGuid: UUID;
  public decisionType: number;
  public ticketConcern: number;
  public decisionJustification: string;
  public date: Date;

  constructor(ticketId: number, ticketGuid: UUID, librarianGuid: UUID) {
    this.ticketId = ticketId;
    this.ticketGuid = ticketGuid;
    this.librarianGuid = librarianGuid;
    this.date = new Date();
  }

}
