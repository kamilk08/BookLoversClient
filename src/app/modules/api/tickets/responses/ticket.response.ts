import { UUID } from 'angular2-uuid';

export interface TicketResponse {
  readonly id: number;
  readonly guid: UUID;
  readonly title: string;
  readonly description: string;
  readonly ticketDate: Date;
  readonly ticketDecision: number;
  readonly ticketConcern: number,
  readonly ticketState: number;
  readonly ticketObjectGuid: UUID
  readonly ticketData: string;
  readonly solvedByGuid: UUID;
  readonly ticketOwnerGuid: UUID;
  readonly ticketOwnerId: number
}
