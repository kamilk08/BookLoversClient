import { UUID } from 'angular2-uuid';
import { Identification } from '../../../shared';
import { Decision } from './decision.model';
import { IssuedBy } from './issued-by.model';
import { SolvedBy } from './solved-by.model';
import { TicketContent } from './ticket-content.model';
import { TicketState } from './ticket-state.model';

export class Ticket {
  public identification: Identification;
  public readonly title: string;
  public readonly data: TicketContent;
  public readonly issuedBy: IssuedBy;
  public date: Date;
  public description: string;
  public decision: Decision;
  public solvedBy: SolvedBy;
  public ticketState: TicketState;

  constructor(title: string, content: TicketContent, decision: Decision,
    solvedBy: SolvedBy, issuedBy: IssuedBy, state: TicketState) {
    this.title = title;
    this.data = content;
    this.decision = decision;
    this.solvedBy = solvedBy;
    this.issuedBy = issuedBy;
    this.ticketState = state;
  }

  setIdentification(identification: Identification) {
    this.identification = identification;
  }

  setDecision(decision: Decision) {
    this.decision = decision;
  }

  markAsSolved(librarianGuid: UUID) {
    if (this.ticketState === TicketState.solved())
      return;

    this.solvedBy = new SolvedBy(librarianGuid);
    this.ticketState = TicketState.solved();
  }
}
