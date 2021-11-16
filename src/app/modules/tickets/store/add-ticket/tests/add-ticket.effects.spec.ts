import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { TicketsApi } from "src/app/modules/api/tickets/tickets.api";
import { ticketsModuleReducer, TicketsModuleState } from "../..";
import { TicketsFacade } from "../../tickets.facade";
import { AddTicketEffects } from "../add-ticket.effects";

import * as fromActions from '../add-ticket.actions';
import { AddTicketModel } from "src/app/modules/api/tickets/models/add-ticket.model";
import { UUID } from "angular2-uuid";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { AddTicketResponse } from "src/app/modules/api/tickets/responses/add-ticket.response";
import { FETCH_TICKET } from "../../tickets/tickets.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_TICKET_EFFECTS', () => {

  let effects: AddTicketEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let api: TicketsApi;
  let facade: TicketsFacade;
  let authService: AuthService;

  let moduleState: TicketsModuleState = {
    addTicket: {
      ticket: undefined,
      processing: false,
      error: undefined
    },
    tickets: undefined,
    resolveTicket: undefined,
    pagination: undefined,
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
        EffectsModule.forFeature([AddTicketEffects])
      ],
      providers: [
        TicketsFacade,
        AddTicketEffects,
        AuthService,
        TokenService,
        CookiesService,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    effects = TestBed.get(AddTicketEffects);
    api = TestBed.get(TicketsApi);
    facade = TestBed.get(TicketsFacade);
    authService = TestBed.get(AuthService);
  })

  describe('CREATE_TICKET', () => {
    it('should assign CREATE_TICKET_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

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

        const action = fromActions.CREATE_TICKET({ payload: { model } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CREATE_TICKET_SUCCESS({ payload: { ticketId: 1 } });

        expectObservable(effects.createTicket$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign CREATE_TICKET_FALIURE when api call was faliure', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const ticketObject = { guid: UUID.UUID(), data: JSON.stringify({ data: 'data' }) };
        const ticketAddons = {
          title: `Book ticket`,
          description: 'User is trying to create a new book',
          concern: TicketConcern.book().value
        }

        const model: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);

        const action = fromActions.CREATE_TICKET({ payload: { model } });

        actions$ = hot('-a', { a: action })

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'createTicket')
          .and.returnValue(response as any);

        const completion = fromActions.CREATE_TICKET_FALIURE({ payload: { model: error } });

        expectObservable(effects.createTicket$)
          .toBe('--b', { b: completion });
      })
    })
  });

  describe('CREATE_TICKET_SUCCESS', () => {
    it('should assign two actions FETCH_TICKET and SHOW_SUCCESS_MESSAGE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;
        const userGuid = UUID.UUID();

        const ticketObject = { guid: UUID.UUID(), data: JSON.stringify({ data: 'data' }) };
        const ticketAddons = {
          title: `Book ticket`,
          description: 'User is trying to create a new book',
          concern: TicketConcern.book().value
        }

        const model: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);
        model.ticketId = 1;

        facade.createTicket(model);

        const action = fromActions.CREATE_TICKET_SUCCESS({ payload: { ticketId: 1 } });

        spyOnProperty(authService, 'userId').and.returnValue(userId);
        spyOnProperty(authService, 'userGuid').and.returnValue(userGuid);

        actions$ = hot('a', { a: action });

        const ticket = model.toTicket(userId, userGuid);

        const firstAction = FETCH_TICKET({ payload: { ticket } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Ticket created successfully 😊' } });
        const thirdAction = MOVE_TO({ payload: { moveTo: { path: ['tickets/user', userId] } } });

        expectObservable(effects.createTicketSuccess$)
          .toBe('(bcd)', { b: firstAction, c: secondAction, d: thirdAction });
      });

    })

  });


});
