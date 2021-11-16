import { HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { QuoteFrom } from 'src/app/modules/api/quotes/models/quote-from.model';
import { QuoteType } from 'src/app/modules/api/quotes/models/quote-type';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';
import * as fromActions from '../add-quote.actions';
import * as fromReducer from '../add-quote.reducer';
import { AddQuoteState } from '../add-quote.reducer';

describe('ADD_QUOTE_REDUCER', () => {

  const initialState: AddQuoteState = {
    quote: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_AUTHOR_QUOTE', () => {
    it('should return new state with processing property set to true', () => {
      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(), QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const action = fromActions.ADD_AUTHOR_QUOTE({ payload: { quote } });

      const newState = fromReducer.addQuoteReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.quote).toEqual(quote);
    });
  });

  describe('ADD_AUTHOR_QUOTE_SUCCESS', () => {
    it('should return new state with quote updated quote id', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(), QuoteType.authorQuote), { id: 1, guid: UUID.UUID() });

      const action = fromActions.ADD_AUTHOR_QUOTE({ payload: { quote } });

      const state = fromReducer.addQuoteReducer(initialState, action);

      const quoteId = 1;

      const secondAction = fromActions.ADD_QUOTE_SUCCESS({ payload: { quoteId } });

      const newState = fromReducer.addQuoteReducer(state, secondAction);

      expect(newState.quote.identification.id).toEqual(quoteId);
    });
  });

  describe('ADD_AUTHOR_QUOTE_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.ADD_QUOTE_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addQuoteReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });
});
