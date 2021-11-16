import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { BookAuthor, BookPublisher, BookDetails, BookCover, BookDescription, BookSeries } from 'src/app/modules/api/books/models';
import { BookBasics } from 'src/app/modules/api/books/models/book-basics.model';
import { Book } from 'src/app/modules/api/books/models/book.model';
import { FICTION_SUBCATEGORIES } from '../../../common/categories';
import * as fromActions from '../process-book.actions';
import * as fromReducer from '../process-book.reducer';
import { ProcessBookState } from '../process-book.reducer';

describe('PROCESS_BOOK_REDUCER', () => {

  const initialState: ProcessBookState = {
    processing: false,
    error: undefined
  };

  describe('ADD_BOOK', () => {
    it('should return new state with processing state set to true', () => {

      let book = new Book(new BookBasics('title', '12455', FICTION_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
        new BookPublisher(1, UUID.UUID(), new Date()));
      book.details = new BookDetails(100, 1);
      book.cover = new BookCover(1, 'source', false);
      book.description = new BookDescription(undefined, undefined);
      book.series = new BookSeries(1, UUID.UUID(), 1);
      book.publisherCycles = []
      book.hashTags = []
      book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };

      const action = fromActions.ADD_BOOK({ payload: { book, cover: undefined } });

      const newState = fromReducer.addBookReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });
  });

  describe('ADD_BOOK_SUCCESS', () => {
    it('should return new state with processing state set to false', () => {

      let book = new Book(new BookBasics('title', '12455', FICTION_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
        new BookPublisher(1, UUID.UUID(), new Date()));
      book.details = new BookDetails(100, 1);
      book.cover = new BookCover(1, 'source', false);
      book.description = new BookDescription(undefined, undefined);
      book.series = new BookSeries(1, UUID.UUID(), 1);
      book.publisherCycles = []
      book.hashTags = []
      book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };

      const action = fromActions.ADD_BOOK_SUCCESS({ payload: { book } });

      const newState = fromReducer.addBookReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('ADD_BOOK_FALIURE', () => {
    it('should return new state with processing state set to false and error should be defined', () => {

      const action = fromActions.ADD_BOOK_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addBookReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.error).toBeDefined();
    });
  });

});

