import { UUID } from 'angular2-uuid';
import { QuoteFrom } from 'src/app/modules/api/quotes/models/quote-from.model';
import { QuoteType } from 'src/app/modules/api/quotes/models/quote-type';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';
import * as fromActions from '../quote-likes.actions';
import * as fromReducer from '../quote-likes.reducer';
import { QuoteLikesState } from '../quote-likes.reducer';


describe('QUOTE_LIKES_REDUCER', () => {

  const initialState: QuoteLikesState = {
    quote: undefined,
    userId: undefined,
    processing: false,
    error: undefined
  };

  describe('LIKE_QUOTE', () => {
    it('should return new state with processing property set to true and updated quote property', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const action = fromActions.LIKE_QUOTE({ payload: { quote, userId: 1 } });

      const newState = fromReducer.quoteLikesReducer(initialState, action);

      expect(newState.quote).toEqual(quote);
      expect(newState.processing).toBeTruthy();
    });
  });

  describe('LIKE_QUOTE_SUCCESS', () => {
    it('should return new state with updated quote property', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const firstAction = fromActions.LIKE_QUOTE({ payload: { quote, userId: 1 } });

      const state = fromReducer.quoteLikesReducer(initialState, firstAction);

      const secondAction = fromActions.LIKE_QUOTE_SUCCESS();

      const newState = fromReducer.quoteLikesReducer(state, secondAction);

      expect(newState.quote.likes.length).toEqual(1);

    });
  });

  describe('UNLIKE_QUOTE', () => {
    it('should return new state with processing property set to true and', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const firstAction = fromActions.LIKE_QUOTE({ payload: { quote, userId: 1 } });

      const state = fromReducer.quoteLikesReducer(initialState, firstAction);

      const secondAction = fromActions.UNLIKE_QUOTE({ payload: { quote: quote, userId: 1 } });

      const newState = fromReducer.quoteLikesReducer(state, secondAction);

      expect(newState.processing).toBeTruthy();
      expect(newState.quote).toEqual(quote);
    });
  });

  describe('UNLIKE_QUOTE_SUCCESS', () => {
    it('should return new state with quote likes to be 0', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(),
        QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const firstAction = fromActions.LIKE_QUOTE({ payload: { quote, userId: 1 } });

      const state = fromReducer.quoteLikesReducer(initialState, firstAction);

      const secondAction = fromActions.UNLIKE_QUOTE({ payload: { quote: quote, userId: 1 } });

      const secondState = fromReducer.quoteLikesReducer(state, secondAction);

      const thirdAction = fromActions.UNLIKE_QUOTE_SUCCESS()

      const newState = fromReducer.quoteLikesReducer(secondState, thirdAction);

      expect(newState.quote.likes.length).toEqual(0);
    });
  });

});
