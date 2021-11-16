import { environment } from 'src/environments/environment';
import { Query } from '../../shared/common/query';

export const GET_TICKET_BY_ID = (ticketId: number) => `${environment.api}/tickets/${ticketId}`;
export const SEARCH_USER_TICKETS = (query: Query, solved: boolean) => `${environment.api}/tickets/title/${solved}/${query.page}/${query.count}/${query.value}`
export const GET_MANAGEABLE_TICKETS_PAGE = (query: Query, solved: boolean) => `${environment.api}/librarians/tickets/${solved}/${query.page}/${query.count}/${query.value}`;

export const ADD_TICKET = `${environment.api}/tickets`;
export const SOLVE_TICKET = `${environment.api}/tickets`;
