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
import { ResolveTicketEffects } from "../resolve-ticket.effects";

import * as fromActions from '../resolve-ticket.actions';
import { ResolveTicket } from "src/app/modules/api/tickets/models/resolve-ticket.model";
import { ResolveTicketBuilder } from "../../tickets/resolve-ticket.builder";
import { UUID } from "angular2-uuid";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { CHANGE_TICKET_STATE } from "../../tickets/tickets.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('RESOLVE_TICKET_TICKET_EFFECTS', () => {

  let effects: ResolveTicketEffects;
  let api: TicketsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();
  let builder: ResolveTicketBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('tickets', ticketsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ResolveTicketEffects])
      ],
      providers: [
        ResolveTicketEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        ResolveTicketBuilder
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    effects = TestBed.get(ResolveTicketEffects);
    api = TestBed.get(TicketsApi);
    builder = TestBed.get(ResolveTicketBuilder);

  });

  describe('RESOLVE_TICKET$', () => {

    it('should assign two actions,RESOLVE_TICKET_SUCCESS and CHANGE_TICKET_STATE when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const model: ResolveTicket = new ResolveTicket(1, UUID.UUID(), UUID.UUID());
        model.decisionType = Decision.approve().value;
        model.ticketConcern = TicketConcern.author().value;

        const action = fromActions.RESOLVE_TICKET({ payload: { model } });

        spyOn(api, 'solveTicket').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.RESOLVE_TICKET_SUCCESS();
        const secondAction = CHANGE_TICKET_STATE({
          payload: {
            ticketId: action.payload.model.ticketId,
            decision: action.payload.model.decisionType,
            librarinGuid: action.payload.model.librarianGuid
          }
        });

        expectObservable(effects.resolveTicket$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          })

      });

    });

    it('should sssign RESOLVET_TICKET_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const model: ResolveTicket = new ResolveTicket(1, UUID.UUID(), UUID.UUID());
        model.decisionType = Decision.approve().value;
        model.ticketConcern = TicketConcern.author().value;

        const action = fromActions.RESOLVE_TICKET({ payload: { model } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'solveTicket').and.returnValue(response as any);

        const completion = fromActions.RESOLVE_TICKET_FALIURE({ payload: { model: error } });

        expectObservable(effects.resolveTicket$)
          .toBe('--b', { b: completion });
      })

    });

  });

});
