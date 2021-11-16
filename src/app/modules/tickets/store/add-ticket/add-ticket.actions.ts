import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddTicketModel } from '../../../api/tickets/models/add-ticket.model';

export const CREATE_TICKET = createAction('[TICKETS] Create new ticket', props<{ payload: { model: AddTicketModel } }>());
export const CREATE_TICKET_SUCCESS = createAction('[TICKETS] Create ticket success', props<{ payload: { ticketId: number } }>());
export const CREATE_TICKET_FALIURE = createAction('[TICKETS] Create ticket faliure', props<{ payload: { model: ApiError } }>());
