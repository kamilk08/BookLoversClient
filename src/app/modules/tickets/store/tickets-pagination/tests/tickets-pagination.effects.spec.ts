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
import { TicketsPaginationEffects } from "../tickets-pagination.effects";

import * as fromActions from '../tickets-pagination.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MULTIPLE_TICKETS } from "../../tickets/tickets.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TicketsPaginationState } from "../tickets-pagination.reducer";

describe('TICKETS_PAGINATION', () => {

  let effects: TicketsPaginationEffects;
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
        EffectsModule.forFeature([TicketsPaginationEffects])
      ],
      providers: [
        TicketsPaginationEffects,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorsFacade,
        ErrorActions,
        provideMockStore<TicketsPaginationState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TicketsPaginationEffects);
    api = TestBed.get(TicketsApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('SELECT_USER_TICKETS$', () => {
    it('should assign two actions FETCH_TICKETS_PAGE and FETCH_MULTIPLE_TICKETS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_USER_TICKETS_PAGE({ payload: { query: DEFAULT_QUERY(), solved: true } });

        const pageResult: PageResult = {
          items: [],
          page: 0,
          totalItems: 0,
          pagesCount: 0
        };

        spyOn(api, 'searchUserTickets').and.returnValue(of(pageResult));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_TICKETS_PAGE({ payload: { pageResult } });
        const secondAction = FETCH_MULTIPLE_TICKETS({ payload: { tickets: [] } });

        expectObservable(effects.selectUserTickets$)
          .toBe('1.5s (bc)', {
            b: firstAction,
            c: secondAction
          });

      });

    });

    it('should assign TICKETS_PAGE_ERROR when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_USER_TICKETS_PAGE({ payload: { query: DEFAULT_QUERY(), solved: true } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'searchUserTickets').and.returnValue(response as any);

        const completion = fromActions.TICKETS_PAGE_ERROR({ payload: { error } });

        expectObservable(effects.selectUserTickets$)
          .toBe('-b', { b: completion });

      })

    });
  });


});
