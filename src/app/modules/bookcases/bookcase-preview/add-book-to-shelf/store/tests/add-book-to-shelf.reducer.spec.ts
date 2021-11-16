import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book, BookAuthor, BookBasics, BookCover, BookDescription, BookPublisher, BookSeries } from 'src/app/modules/api/books/models';
import { CoverType } from 'src/app/modules/api/books/models/cover-type';
import { Shelf } from 'src/app/modules/bookcases/models';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import * as fromActions from '../add-book-to-shelf.actions';
import * as fromReducer from '../add-book-to-shelf.reducer';
import { AddBookToShelfState } from '../add-book-to-shelf.reducer';

describe('ADD_BOOK_TO_SHELF_REDUCER', () => {

  let shelf: Shelf;
  let book: Book;

  shelf = new Shelf(1, 'TEST_SHELF');
  shelf.setShelfId(1);

  book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
  book.setBookId(1);
  book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };
  book.authors = [new BookAuthor(1, UUID.UUID())];
  book.cover = new BookCover(CoverType.hardCover().id, undefined, false);
  book.description = new BookDescription('content', 'source');
  book.series = new BookSeries(1, UUID.UUID(), 1);
  book.hashTags = [{ hashTagValue: '#hashTag' }];

  const initialState: AddBookToShelfState = {
    shelf: undefined,
    book: undefined,
    processing: false,
    error: undefined
  }

  describe('ADD_BOOK_TO_SHELF', () => {
    it('should return new state with processing property set to true and shelf aswell as book property should be defined', () => {

      const action = fromActions.ADD_BOOK_TO_SHELF({ payload: { bookcase: undefined, shelf, book } })

      const newState = fromReducer.addBookToBookcaseReducer(initialState, action);

      const foo = newState.book.identification.guid
      const bar = newState.shelf.identification.guid

      expect(newState.processing).toBeTruthy();
      expect(foo).toEqual(book.identification.guid);
      expect(bar).toEqual(shelf.identification.guid);
    });
  });
  describe('ADD_BOOK_TO_SHELF_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {

      const action = fromActions.ADD_BOOK_TO_SHELF_SUCCESS({ payload: { bookcase: undefined } });

      const newState = fromReducer.addBookToBookcaseReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });
  describe('ADD_BOOK_TO_SHELF_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.ADD_BOOK_TO_SHELF_FALIURE({ payload: { model: error } });

      const newState = fromReducer.addBookToBookcaseReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
