import { HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book, BookBasics, BookAuthor, BookPublisher } from 'src/app/modules/api/books/models';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import * as fromActions from '../add-cycle-book.actions';
import * as fromReducer from '../add-cycle-book.reducer';
import { AddPublisherCycleBookState } from '../add-cycle-book.reducer';

describe('ADD_CYCLE_BOOK_REDUCER', () => {

  const initialState: AddPublisherCycleBookState = {
    publisherCycle: undefined,
    book: undefined,
    processing: false,
    error: undefined
  };


  describe('ADD_CYCLE_BOOK', () => {
    it('should return new state with defined publisherCycle and book property', () => {
      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      const book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
        new BookPublisher(1, UUID.UUID(), new Date()));

      const action = fromActions.ADD_CYCLE_BOOK({ payload: { cycle, book } });

      const newState = fromReducer.addCycleBookReducer(initialState, action);

      expect(newState.book).toBeDefined();
      expect(newState.publisherCycle).toBeDefined();
    });
  });

  describe('ADD_CYCLE_BOOK_SUCCESS', () => {
    it('should return new state with updated added publisherCycle', () => {

      const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
      const book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
        new BookPublisher(1, UUID.UUID(), new Date()));

      const firstAction = fromActions.ADD_CYCLE_BOOK({ payload: { cycle, book } });

      const firstState = fromReducer.addCycleBookReducer(initialState, firstAction);

      const action = fromActions.ADD_CYCLE_BOOK_SUCCESS({ payload: {} });

      const newState = fromReducer.addCycleBookReducer(firstState, action);

      expect(newState.publisherCycle.books.some(s => s === book.identification.id)).toBeTruthy();
    });
  });

  describe('ADD_CYCLE_BOOK_FALIURE', () => {
    it('should return new state with error property set to true', () => {

      const error = new HttpErrorResponse({});

      const action = fromActions.ADD_CYCLE_BOOK_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addCycleBookReducer(initialState, action);

      expect(newState.error).toBeDefined();

    });
  });

});
