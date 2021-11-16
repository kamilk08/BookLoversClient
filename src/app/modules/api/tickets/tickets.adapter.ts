import { Injectable } from '@angular/core';
import { Adapter } from '../../shared';
import { AVALIABLE_DECISIONS } from './models/decision.model';
import { IssuedBy } from './models/issued-by.model';
import { SolvedBy } from './models/solved-by.model';
import { TicketContent } from './models/ticket-content.model';
import { TICKET_STATES } from './models/ticket-state.model';
import { Ticket } from './models/ticket.model';
import { TicketResponse } from './responses/ticket.response';

@Injectable()
export class TicketAdapter implements Adapter<Ticket> {


  adapt(item: any): Ticket {
    if (!item)
      throw new Error('Invalid ticket response');

    const response: TicketResponse = item;
    const ticket: Ticket = {
      identification: {
        id: response.id,
        guid: response.guid
      },
      title: response.title,
      data: new TicketContent(response.ticketObjectGuid, response.ticketData, response.ticketConcern),
      decision: AVALIABLE_DECISIONS.find(f => f.value === response.ticketDecision),
      solvedBy: new SolvedBy(response.solvedByGuid),
      issuedBy: new IssuedBy(response.ticketOwnerId, response.ticketOwnerGuid),
      ticketState: TICKET_STATES.find(f => f.value === response.ticketState),
      date: response.ticketDate,
      description: response.description,
      setDecision: Ticket.prototype.setDecision,
      setIdentification: Ticket.prototype.setIdentification,
      markAsSolved: Ticket.prototype.markAsSolved
    };

    return ticket;

  }

}
