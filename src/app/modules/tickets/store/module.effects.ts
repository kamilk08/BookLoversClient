import { AddTicketEffects } from "./add-ticket/add-ticket.effects";
import { ResolveTicketEffects } from "./resolve-ticket/resolve-ticket.effects";
import { TicketsPaginationEffects } from "./tickets-pagination/tickets-pagination.effects";
import { TicketEffects } from "./tickets/tickets.effects";
import { TicketsWebPageEffects } from "./web-page/tickets-web-page.effects";

export const moduleEffects: any[] = [
  AddTicketEffects,
  ResolveTicketEffects,
  TicketEffects,
  TicketsPaginationEffects,
  TicketsWebPageEffects]
