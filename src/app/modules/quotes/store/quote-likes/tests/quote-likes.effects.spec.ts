import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { QuotesApi } from "src/app/modules/api/quotes/quotes.api";
import { QuotesFacade } from "../../quotes/quote.facade";
import { QuoteLikesEffects } from "../quote-likes.effects";

import * as fromActions from '../quote-likes.actions';
import { QuoteFrom } from "src/app/modules/api/quotes/models/quote-from.model";
import { Quote } from "src/app/modules/api/quotes/models/quote.model";
import { UUID } from "angular2-uuid";
import { QuoteType } from "src/app/modules/api/quotes/models/quote-type";
import { EffectsModule } from "@ngrx/effects";
import { quotesStateReducer } from "../..";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('QUOTE_LIKES_EFFECTS', () => {

  let effects: QuoteLikesEffects;
  let api: QuotesApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('quotes', quotesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([QuoteLikesEffects])
      ],
      providers: [
        QuoteLikesEffects,
        QuotesFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(QuoteLikesEffects);
    api = TestBed.get(QuotesApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('LIKE_QUOTE', () => {

    it('should assign LIKE_QUOTE_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
          QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

        const action = fromActions.LIKE_QUOTE({ payload: { quote: quote, userId: 1 } })

        spyOn(api, 'likeQuote').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.LIKE_QUOTE_SUCCESS();

        expectObservable(effects.likeQuote$)
          .toBe('b', { b: completion });
      });
    });
  });

  describe('UNLIKE_QUOTE', () => {
    it('should assign UNLIKE_QUOTE_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
          QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

        const action = fromActions.UNLIKE_QUOTE({ payload: { quote: quote, userId: 1 } })

        spyOn(api, 'unLikeQuote').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.UNLIKE_QUOTE_SUCCESS();

        expectObservable(effects.unLikeQuote$)
          .toBe('b', { b: completion });

      });
    });


  });



});
