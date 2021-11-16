import { Books } from "../book.reducer";
import * as fromActions from '../book.actions';
import * as fromReducer from '../book.reducer';
import { Book, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { UUID } from "angular2-uuid";
import { ALL_SUBCATEGORIES } from "../../common/categories";

describe('BOOK_REDUCER', () => {

  const initialState: Books = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  it('FETCH_BOOK action should return new state with new book', () => {

    let book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
    book.setBookId(1);

    const action = fromActions.FETCH_BOOK({ payload: { book } });

    const newState = fromReducer.booksReducer(initialState, action);

    expect(newState.entities[book.identification.id]).toBe(book);
  });

  it('FETCH_MUTLIPLE_BOOKS should return new state with new books', () => {

    let book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
    book.setBookId(1);

    const action = fromActions.FETCH_MULTIPLE_BOOKS({ payload: { books: [book] } });

    const newState = fromReducer.booksReducer(initialState, action);

    expect(newState.entities[book.identification.id]).toBe(book);

  });

  it('SELECT_BOOK action should return new state with processing property set to true', () => {

    const action = fromActions.SELECT_BOOK({ payload: { bookId: 1 } });

    const newState = fromReducer.booksReducer(initialState, action);

    expect(newState.processing).toBeTruthy();
  });

  it('SELECT_MULTIPLE_BOOKS should return new state with processing property set to false', () => {

    const action = fromActions.SELECT_MUTLTIPLE_BOOKS_BY_ID({ payload: { bookIds: [1] } });

    const newState = fromReducer.booksReducer(initialState, action);

    expect(newState.processing).toBeTruthy();
  });

});
