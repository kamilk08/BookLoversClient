import { UUID } from "angular2-uuid";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { IssuedBy } from "src/app/modules/api/tickets/models/issued-by.model";
import { SolvedBy } from "src/app/modules/api/tickets/models/solved-by.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { TicketContent } from "src/app/modules/api/tickets/models/ticket-content.model";
import { TicketState } from "src/app/modules/api/tickets/models/ticket-state.model";
import { Ticket } from "src/app/modules/api/tickets/models/ticket.model";
import { ResolveTicketBuilder } from "../resolve-ticket.builder";

describe('RESOLVE_TICKET_BUILDER', () => {

  let builder: ResolveTicketBuilder

  beforeEach(() => {

    builder = new ResolveTicketBuilder();
  });

  it('should created resolved ticket object based on devlivered input', () => {

    const ticket: Ticket = new Ticket('title',
      new TicketContent(UUID.UUID(), 'content', TicketConcern.author().value),
      Decision.approve(), new SolvedBy(UUID.UUID()), new IssuedBy(1, UUID.UUID()), TicketState.inProgress()
    );

    ticket.setIdentification({ id: 1, guid: UUID.UUID() });

    const resolvedTicket = builder.initialize(ticket, UUID.UUID())
      .setDecision(Decision.approve())
      .setJustification('justification')
      .setTicketConcern(TicketConcern.author())
      .getResolveModel();

    expect(resolvedTicket).toBeDefined();
    expect(resolvedTicket).not.toBeNull();

  })

});
