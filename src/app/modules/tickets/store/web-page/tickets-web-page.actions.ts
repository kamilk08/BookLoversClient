import { createAction, props } from "@ngrx/store";
import { Ticket } from "../../../api/tickets/models/ticket.model";

export const SET_TICKETS_COUNT_PER_PAGE = createAction('[TICKETS] Set tickets count per page', props<{ payload: { count: number } }>());
export const SET_TICKETS_ON_PAGE = createAction('[TICKETS] Set tickets on page', props<{ payload: { items: Array<{ ticketId: number, isOpen: boolean }> } }>());
export const SELECT_TICKETS_ACCORDING_TO_USER = createAction('[TICKETS] Select tickets according to user');
export const SELECT_TICKETS_TO_SOLVE = createAction('[TICKETS] Select tickets to solve');
export const SELECT_USER_TICKETS = createAction('[TICKETS] Select user tickets');

export const SOLVE_USER_TICKET = createAction('[TICKETS] Solve user ticket', props<{ payload: { ticket: Ticket, isAccepted: boolean } }>());
export const ACCEPT_USER_TICKET = createAction('[TICKETS] Accept user ticket', props<{ payload: { ticket: Ticket } }>());
export const DECLINE_USER_TICKET = createAction('[TICKETS] Decline user ticket', props<{ payload: { ticket: Ticket } }>());

export const CHANGE_TICKETS_PAGE = createAction('[TICKETS] Change tickets page', props<{ payload: { page: number } }>());
export const TOGGLE_SELECTED_TICKET = createAction('[TICKETS] Toggle selected ticket', props<{ payload: { ticketId: number, isOpen: boolean } }>());

export const INCLUDE_SOLVED_TICKETS = createAction('[TICKETS] Include solved tickets');
export const EXCLUDE_SOLVED_TICKETS = createAction('[TICKETS] Exclude solved tickets');
