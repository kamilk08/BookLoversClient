import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Decision } from "../../../api/tickets/models/decision.model";
import { TicketConcern } from "../../../api/tickets/models/ticket-concern.model";
import { Ticket } from "../../../api/tickets/models/ticket.model";
import { ResolveTicket } from "../../../api/tickets/models/resolve-ticket.model";

@Injectable()
export class ResolveTicketBuilder {

  private resolveModel: ResolveTicket;

  constructor() {

  }

  initialize(ticket:Ticket, librarianGuid: UUID) {
    this.resolveModel = new ResolveTicket(ticket.identification.id, ticket.identification.guid, librarianGuid);

    return this;
  }

  setDecision(decision: Decision) {
    this.resolveModel.decisionType = decision.value;

    return this;
  }

  setTicketConcern(ticketConcern: TicketConcern) {
    this.resolveModel.ticketConcern = ticketConcern.value;

    return this;
  }

  setJustification(justification: string) {
    this.resolveModel.decisionJustification = justification;

    return this;
  }

  getResolveModel() {
    return this.resolveModel;
  }



}
