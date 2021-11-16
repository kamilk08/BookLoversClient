import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { BookApi } from "src/app/modules/api/books/book.api";
import { BookEffects } from "../book.effects";
import { Book, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { UUID } from "angular2-uuid";
import { ALL_SUBCATEGORIES } from "../../common/categories";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { Books } from "../book.reducer";

import * as fromActions from '../book.actions';

describe('BOOK_EFFECTS', () => {

  let api: BookApi;
  let effects: BookEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BookEffects,
        BookApi,
        BookAdapter,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockStore<Books>({}),
        provideMockActions(() => actions$)
      ]
    });

    api = TestBed.get(BookApi);
    effects = TestBed.get(BookEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });


  describe('selectBookById$', () => {

    it('should dispatch FETCH_BOOK action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const book = new Book(new BookBasics('title', '12345', ALL_SUBCATEGORIES[0]),
          [], new BookPublisher(1, UUID.UUID(), new Date()));
        book.setBookId(bookId);

        const action = fromActions.SELECT_BOOK({ payload: { bookId } });
        const completion = fromActions.FETCH_BOOK({ payload: { book } })

        spyOn(api, 'getBookById')
          .and.returnValue(of(book))

        actions$ = hot('-a', { a: action });

        expectObservable(effects.selectBookById$)
          .toBe('-b', { b: completion });

      })

    });

    it('should dispatch FETCH_BOOK_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const book = new Book(new BookBasics('title', '12345', ALL_SUBCATEGORIES[0]),
          [], new BookPublisher(1, UUID.UUID(), new Date()));
        book.setBookId(bookId);

        const action = fromActions.SELECT_BOOK({ payload: { bookId } });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBookById')
          .and.returnValue(response as any);

        actions$ = hot('-a', { a: action });

        const completion = fromActions.FETCH_BOOK_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectBookById$)
          .toBe('--b', { b: completion });
      })

    });

  });

  describe('selectMultipleBooksById$', () => {
    it('should dispatch FETCH_BOOK action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_MUTLTIPLE_BOOKS_BY_ID({ payload: { bookIds: [] } });

        spyOn(api, 'getBooksByIds').and.returnValue(of([]));

        const completion = fromActions.FETCH_MULTIPLE_BOOKS({ payload: { books: [] } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.selectMultipleBooksById$)
          .toBe('b', { b: completion });
      })
    });

    it('should dispatch FETCH_BOOK_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_MUTLTIPLE_BOOKS_BY_ID({ payload: { bookIds: [] } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBooksByIds')
          .and.returnValue(response as any);

        const completion = fromActions.FETCH_BOOK_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectMultipleBooksById$)
          .toBe('--b', { b: completion });
      })

    });

  })

});
