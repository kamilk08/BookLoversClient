import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { QuotesApi } from "src/app/modules/api/quotes/quotes.api";
import { AddQuoteEffects } from "../add-quote.effects";

import * as fromActions from '../add-quote.actions';
import { Quote } from "src/app/modules/api/quotes/models/quote.model";
import { UUID } from "angular2-uuid";
import { QuoteFrom } from "src/app/modules/api/quotes/models/quote-from.model";
import { QuoteType } from "src/app/modules/api/quotes/models/quote-type";
import { AddQuoteResponse } from "src/app/modules/api/quotes/responses/add-quote.response";
import { QuotesFacade } from "../../quotes/quote.facade";
import { SHOW_FALIURE_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_QUOTE_EFFECTS', () => {

  let effects: AddQuoteEffects;
  let facade: QuotesFacade;
  let api: QuotesApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        AddQuoteEffects,
        QuotesFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore({})
      ]
    });

    facade = TestBed.get(QuotesFacade);
    effects = TestBed.get(AddQuoteEffects);
    api = TestBed.get(QuotesApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_AUTHOR_QUOTE$', () => {
    it('should assign ADD_QUOTE_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const quote = new Quote('quote', new QuoteFrom(UUID.UUID(), QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

        const action = fromActions.ADD_AUTHOR_QUOTE({ payload: { quote } });

        const response: AddQuoteResponse = {
          quoteId: 1,
          quoteGuid: quote.identification.guid,
          quotedGuid: UUID.UUID(),
          quote: 'quote',
          addedAt: new Date().toString()
        }

        spyOn(api, 'addAuthorQuote').and.returnValue(of(response));

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_QUOTE_SUCCESS({ payload: { quoteId: response.quoteId } });

        expectObservable(effects.addAuthorQuote$)
          .toBe('1.5s b', { b: completion });
      });

    });

  });
});
