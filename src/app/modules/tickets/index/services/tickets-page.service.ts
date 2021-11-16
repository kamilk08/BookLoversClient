import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AddAuthorModel } from 'src/app/modules/api/authors/add-author/models/add-author.model';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { AddNewBook as AddNewBookModel } from 'src/app/modules/api/books/add/models/add-book.model';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { TicketState } from '../../../api/tickets/models/ticket-state.model';
import { Ticket } from '../../../api/tickets/models/ticket.model';
import { TicketsFacade } from '../../store/tickets.facade';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { User } from 'src/app/modules/api/auth/models/user.model';

@Injectable()
export class TicketsPageService {

  constructor(
    public readonly ticketsFacade: TicketsFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly readerFacade: ReadersFacade) { }

  public tickets$ = this.ticketsFacade.pageResult$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.items as Ticket[]),
      map((tickets: Ticket[]) => tickets.map(s => s.identification.id)),
      switchMap((ids: number[]) => this.ticketsFacade.multipleTickets$(ids))
    );

  public readonly bookTicketAuthors$ = (ticketId: number) => this.tickets$
    .pipe(
      map(tickets => tickets.find(f => f.identification.id === ticketId)),
      map(ticket => JSON.parse(ticket.data.content) as AddNewBookModel),
      map(data => data.bookWriteModel.authors),
      switchMap((guids) => this.authorsFacade.multipleAuthorsByGuid$(guids))
    );

  public readonly bookTicketContent$ = (ticketId: number) => this.tickets$
    .pipe(
      map(tickets => tickets.find(f => f.identification.id === ticketId)),
      map(ticket => JSON.parse(ticket.data.content) as AddNewBookModel),
      filter(noNullOrUndefined()),
      map((ticket:AddNewBookModel) => ticket.bookWriteModel)
    );

  public readonly bookTicketCover$ = (ticketId: number) => this.tickets$
    .pipe(
      map(tickets => tickets.find(f => f.identification.id === ticketId)),
      map(ticket => JSON.parse(ticket.data.content) as AddNewBookModel),
      filter(noNullOrUndefined()),
      map((ticket:AddNewBookModel) => ticket.pictureWriteModel)
    );

  public readonly authorTicketContent$ = (ticketId: number) => this.tickets$
    .pipe(
      map(tickets => tickets.find(f => f.identification.id === ticketId)),
      map(ticket => JSON.parse(ticket.data.content) as AddAuthorModel),
      filter(noNullOrUndefined()),
      map((ticket: AddAuthorModel) => ticket.authorWriteModel)
    );

  public readonly authorImage$ = (ticketId: number) => this.tickets$
    .pipe(
      map(tickets => tickets.find(f => f.identification.id === ticketId)),
      map(ticket => JSON.parse(ticket.data.content) as AddAuthorModel),
      filter(noNullOrUndefined()),
      map((ticket:AddAuthorModel) => ticket.pictureWriteModel)
    );

  public readonly isTicketSolved = (ticket: Ticket) => ticket.ticketState.value === TicketState.solved().value;

}


