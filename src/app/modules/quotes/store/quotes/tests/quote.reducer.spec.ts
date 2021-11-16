import { UUID } from 'angular2-uuid';
import { QuoteFrom } from 'src/app/modules/api/quotes/models/quote-from.model';
import { QuoteType } from 'src/app/modules/api/quotes/models/quote-type';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';
import * as fromActions from '../quote.actions';
import * as fromReducer from '../quote.reducer';

import { Quotes } from '../quote.reducer';

describe('QUOTE_REDUCER', () => {

  const initialState: Quotes = {
    entities: {},
    ids: [],
    error: undefined,
    processing: false
  }

  describe('SELECT_QUOTE', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_QUOTE({ payload: { id: 1 } });

      const newState = fromReducer.quoteReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });
  });

  describe('UPDATE_QUOTE', () => {
    it('should return new state with updated quote property', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });
      quote.setQuoteId(1);

      const firstAction = fromActions.FETCH_QUOTE({ payload: { quote } });
      const state = fromReducer.quoteReducer(initialState, firstAction);

      quote.addLike(2);

      const action = fromActions.UPDATE_QUOTE({ payload: { quote } });

      const newState = fromReducer.quoteReducer(state, action);

      expect(newState.entities[quote.identification.id].likes.length).toEqual(1);
    });
  });

  describe('FETCH_QUOTE', () => {
    it('should return new state with updated entities property', () => {
      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });
      quote.setQuoteId(1);

      const firstAction = fromActions.FETCH_QUOTE({ payload: { quote } });
      const state = fromReducer.quoteReducer(initialState, firstAction);

      expect(state.entities[quote.identification.id]).toEqual(quote);
    });
  });

  describe('FETCH_MULTIPLE_QUOTES', () => {
    it('should return new state with updated entities property', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });
      quote.setQuoteId(1);

      const action = fromActions.FETCH_MULTIPLE_QUOTES({ payload: { quotes: [quote] } });

      const state = fromReducer.quoteReducer(initialState, action);

      expect(state.entities[quote.identification.id]).toEqual(quote);

    });
  });

});
