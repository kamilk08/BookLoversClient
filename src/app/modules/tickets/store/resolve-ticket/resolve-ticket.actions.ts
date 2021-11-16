import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ResolveTicket } from "../../../api/tickets/models/resolve-ticket.model";

export const RESOLVE_TICKET = createAction('[TICKETS] Resolve ticket', props<{ payload: { model: ResolveTicket } }>());
export const RESOLVE_TICKET_SUCCESS = createAction('[TICKETS] Resolve ticket success');
export const RESOLVE_TICKET_FALIURE = createAction('[TICKETS] Resolvet ticket faliure', props<{ payload: { model: ApiError } }>());
