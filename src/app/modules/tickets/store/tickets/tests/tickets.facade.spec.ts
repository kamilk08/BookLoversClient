import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { AddTicketModel } from "src/app/modules/api/tickets/models/add-ticket.model";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { IssuedBy } from "src/app/modules/api/tickets/models/issued-by.model";
import { SolvedBy } from "src/app/modules/api/tickets/models/solved-by.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { TicketContent } from "src/app/modules/api/tickets/models/ticket-content.model";
import { TicketState } from "src/app/modules/api/tickets/models/ticket-state.model";
import { Ticket } from "src/app/modules/api/tickets/models/ticket.model";
import { AddTicketResponse } from "src/app/modules/api/tickets/responses/add-ticket.response";
import { TicketsApi } from "src/app/modules/api/tickets/tickets.api";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ticketsModuleReducer, TicketsModuleState } from "../..";
import { AddTicketEffects } from "../../add-ticket/add-ticket.effects";
import { TicketsPaginationEffects } from "../../tickets-pagination/tickets-pagination.effects";
import { TicketsFacade } from "../../tickets.facade";
import { TicketEffects } from "../tickets.effects";

describe('TICKETS_FACADE', () => {

  let facade: TicketsFacade;
  let api: TicketsApi;

  let moduleState: TicketsModuleState = {
    addTicket: {
      ticket: undefined,
      processing: false,
      error: undefined
    },
    tickets: {
      entities: {},
      ids: [],
      processing: false,
      error: undefined
    },
    resolveTicket: undefined,
    pagination: {
      pageResult: undefined,
      processing: false,
      error: undefined
    },
    webPage: undefined
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('tickets', ticketsModuleReducer, { initialState: moduleState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TicketEffects, TicketsPaginationEffects, AddTicketEffects])
      ],
      providers: [
        TicketsFacade,
        AuthService,
        TokenService,
        CookiesService,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(TicketsFacade);
    api = TestBed.get(TicketsApi);
  });

  describe('SELECT_TICKET', () => {
    it('should dispatch an action and as a result of which ticketById$ observable should emit new value', async (done) => {

      const ticketId = 1;

      const ticket: Ticket = new Ticket('title',
        new TicketContent(UUID.UUID(), 'content', TicketConcern.author().value),
        Decision.approve(), new SolvedBy(UUID.UUID()), new IssuedBy(1, UUID.UUID()), TicketState.inProgress()
      );
      ticket.setIdentification({ id: ticketId, guid: UUID.UUID() });

      spyOn(api, 'getTicketById').and.returnValue(of(ticket));

      facade.selectTicket(ticketId);

      const subscription = facade.ticketById$(ticketId)
        .subscribe(val => {
          expect(val).toEqual(ticket);
          done();
        });

      subscription.unsubscribe();
    });

  });

  describe('CREATE_TICKET', () => {

    it('should dispatch an action and as a result of which ticketById$ should emit new observable', async (done) => {

      const ticketObject = { guid: UUID.UUID(), data: JSON.stringify({ data: 'data' }) };
      const ticketAddons = {
        title: `Book ticket`,
        description: 'User is trying to create a new book',
        concern: TicketConcern.book().value
      }

      const response: AddTicketResponse = {
        ticketId: 1
      };

      spyOn(api, 'createTicket').and.returnValue(of(response));

      const model: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);

      facade.createTicket(model);

      const subscription = facade.ticketById$(response.ticketId)
        .subscribe(val => {
          expect(val.identification.id).toEqual(response.ticketId);
          done();
        });

      subscription.unsubscribe();

    });

  });

});
