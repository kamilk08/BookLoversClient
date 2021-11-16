import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Ticket } from '../../../api/tickets/models/ticket.model';

export const SELECT_TICKET_BY_ID = createAction('[TICKETS] Select ticket by id', props<{ payload: { id: number } }>());
export const CHANGE_TICKET_STATE = createAction('[TICKETS] Change ticket state', props<{ payload: { ticketId: number, decision: number, librarinGuid: UUID } }>());
export const FETCH_TICKET = createAction('[TICKETS] Fetch ticket', props<{ payload: { ticket: Ticket } }>());
export const FETCH_MULTIPLE_TICKETS = createAction('[TICKETS] Fetch multiple tickets', props<{ payload: { tickets: Ticket[] } }>());
export const FETCH_TICKETS_ERROR = createAction('[TICKETS] Fetch ticket error', props<{ payload: { model: ApiError } }>());
