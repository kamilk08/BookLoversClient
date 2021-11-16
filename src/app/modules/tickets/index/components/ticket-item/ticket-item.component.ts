import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Decision } from '../../../../api/tickets/models/decision.model';
import { Ticket } from '../../../../api/tickets/models/ticket.model';

@Component({
  selector: 'ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class TicketItemComponent implements OnInit, OnChanges, OnDestroy {

  public toggled: boolean;

  public readonly isDeclined = (decision: Decision) => decision === Decision.decline();

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() ticket: Ticket;

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  toggleShow() {
    this.toggled = !this.toggled;
    this.toggle.emit(this.toggled);
  }

}
