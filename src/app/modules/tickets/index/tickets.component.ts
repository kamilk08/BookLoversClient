import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { AddNewBook } from '../../api/books/add/models/add-book.model';
import { noNullOrUndefined } from '../../shared/common/operator-extensions';
import { PageChangeEvent } from '../../shared/common/page-change.event';
import { TicketConcern, TicketConcernEnum } from '../../api/tickets/models/ticket-concern.model';
import { Ticket } from '../../api/tickets/models/ticket.model';
import { TicketContentService } from './components/ticket-content.service';
import { TicketsPageService } from './services/tickets-page.service';
import { PageResult } from '../../shared/common/page-result';
import { DEFAULT_ITEMS_COUNT } from '../../shared/common/query';
import { TicketsWebPageFacade } from '../store/web-page/tickets-web-page.facade';
import { SolveTicketChange } from './components/author-ticket-content/events/solve-ticket-change';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'ticket-component',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public readonly ticketConcerns = TicketConcernEnum

  constructor(
    public readonly authService: AuthService,
    public readonly pageService: TicketsPageService,
    public readonly pageFacade: TicketsWebPageFacade,
    public readonly ticketContentService: TicketContentService) { }

  ngOnInit() {
    this.pageFacade.setTicketsCountPerPage(DEFAULT_ITEMS_COUNT);
    this.pageFacade.selectTicketsAccordingToUser();
    this.pageService.readerFacade.selectReader(this.authService.userId);

    this.pageService.ticketsFacade.pageResult$
      .pipe(
        filter(noNullOrUndefined()),
        map((result: PageResult) => result.items as Ticket[]),
        tap(tickets => this.pageFacade.setTicketsToManage(tickets)),
        map((tickets) => tickets.filter(s => s.data.ticketConcern.value === TicketConcern.book().value)),
        map(tickets => tickets.map(s => JSON.parse(s.data.content) as AddNewBook)),
        tap((contents) => contents.selectMany(sm => sm.bookWriteModel.authors).distinct().forEach(guid => this.pageService.authorsFacade.selectByGuid(guid))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleSolved(flag: boolean) {
    flag ? this.pageFacade.includeSolvedTickets() : this.pageFacade.excludeSolvedTickets();
  }

  onPageChange(event: PageChangeEvent) {
    this.pageFacade.changeTicketsPage(event.currentPage - 1);
  }

  onSolveTicket(event: SolveTicketChange, ticket: Ticket) {
    this.pageFacade.solveTicket(ticket, event.approved);
  }

  toggleTicket(flag: boolean, ticketId: number) {
    this.pageFacade.toggleTicket(ticketId, flag);
  }

  showUserMode() {
    if (this.authService.isReader && (this.authService.isLibrarian || this.authService.isSuperAdmin))
      return false;

    return true;
  }
}
