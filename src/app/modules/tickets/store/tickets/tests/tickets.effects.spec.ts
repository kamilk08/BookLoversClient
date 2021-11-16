import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { TicketsApi } from "src/app/modules/api/tickets/tickets.api";
import { ticketsModuleReducer } from "../..";
import { TicketEffects } from "../tickets.effects";

import * as fromActions from '../tickets.actions';
import { Ticket } from "src/app/modules/api/tickets/models/ticket.model";
import { TicketContent } from "src/app/modules/api/tickets/models/ticket-content.model";
import { UUID } from "angular2-uuid";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { SolvedBy } from "src/app/modules/api/tickets/models/solved-by.model";
import { IssuedBy } from "src/app/modules/api/tickets/models/issued-by.model";
import { TicketState } from "src/app/modules/api/tickets/models/ticket-state.model";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";


describe('TICKETS_EFFECTS', () => {

  let effects: TicketEffects;
  let scheduler: TestScheduler;
  let api: TicketsApi;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('tickets', ticketsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TicketEffects])
      ],
      providers: [
        TicketEffects,
        ErrorActions,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    effects = TestBed.get(TicketEffects);
    api = TestBed.get(TicketsApi);

  });

  describe('SELECT_TICKET$', () => {

    it('should assign FETCH_TICKET action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_TICKET_BY_ID({ payload: { id } });

        const ticket: Ticket = new Ticket('title',
          new TicketContent(UUID.UUID(), 'content', TicketConcern.author().value),
          Decision.approve(), new SolvedBy(UUID.UUID()), new IssuedBy(1, UUID.UUID()), TicketState.inProgress()
        )

        spyOn(api, 'getTicketById').and.returnValue(of(ticket));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_TICKET({ payload: { ticket } });

        expectObservable(effects.selectTicket$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign FETCH_TICKET_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_TICKET_BY_ID({ payload: { id } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getTicketById').and.returnValue(response as any);

        const completion = fromActions.FETCH_TICKETS_ERROR({ payload: { model: error } });

        expectObservable(effects.selectTicket$)
          .toBe('--b', { b: completion });

      });

    });

  });

})
