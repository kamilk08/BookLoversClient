import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PageResult } from '../../shared/common/page-result';
import { Query } from '../../shared/common/query';
import { DEFAULT_HEADERS } from '../../shared/headers/url.headers';
import { AddTicketModel } from './models/add-ticket.model';
import { ResolveTicket } from './models/resolve-ticket.model';
import { AddTicketResponse } from './responses/add-ticket.response';
import { TicketResponse } from './responses/ticket.response';
import { TicketAdapter } from './tickets.adapter';
import { ADD_TICKET, GET_MANAGEABLE_TICKETS_PAGE, GET_TICKET_BY_ID, SEARCH_USER_TICKETS, SOLVE_TICKET } from './tickets.urls';

@Injectable()
export class TicketsApi {

  constructor(private readonly http: HttpClient, private adapter: TicketAdapter) {

  }

  getTicketById(ticketId: number) {
    return this.http.get(GET_TICKET_BY_ID(ticketId), { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response: TicketResponse) => this.adapter.adapt(response))
      )
  }


  searchUserTickets(query: Query, solved: boolean) {
    return this.http.get(SEARCH_USER_TICKETS(query, solved), { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response: PageResult) => {
          response.items = response.items.map(i => this.adapter.adapt(i));
          return response;
        })
      )
  };

  getManageableTickets(query: Query, solved: boolean) {
    return this.http.get(GET_MANAGEABLE_TICKETS_PAGE(query, solved), { headers: DEFAULT_HEADERS() })
      .pipe(
        map((response: PageResult) => {
          response.items = response.items.map(i => this.adapter.adapt(i));
          return response;
        })
      )
  }

  createTicket(model: AddTicketModel) {
    return this.http.post(ADD_TICKET, JSON.stringify(model), { headers: DEFAULT_HEADERS() })
      .pipe(map((response: any) => response as AddTicketResponse));
  }

  solveTicket(model: ResolveTicket) {
    return this.http.put(SOLVE_TICKET, JSON.stringify(model), { headers: DEFAULT_HEADERS() });
  }
}
