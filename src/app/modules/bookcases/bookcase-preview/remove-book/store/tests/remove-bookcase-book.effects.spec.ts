import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { Book, BookBasics, BookPublisher, BookAuthor, BookCover, BookDescription, BookSeries } from "src/app/modules/api/books/models";
import { CoverType } from "src/app/modules/api/books/models/cover-type";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Shelf, Bookcase } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { RemoveBookcaseBookState } from "..";
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { REMOVE_BOOK_FROM_BOOKCASE, REMOVE_BOOK_FROM_BOOKCASE_FALIURE, REMOVE_BOOK_FROM_BOOKCASE_SUCCESS } from "../remove-book-from-bookcase.actions";
import { REMOVE_BOOK_FROM_SHELF, REMOVE_BOOK_FROM_SHELF_FALIURE, REMOVE_BOOK_FROM_SHELF_SUCCESS } from "../remove-book-from-shelf.actions";
import { RemoveBookcaseBookEffects } from "../remove-bookcase-book.effects";
import { RemoveBookcaseBookFacade } from "../remove-bookcase-book.facade";


describe('REMOVE_BOOKCASE_BOOK', () => {

  let effects: RemoveBookcaseBookEffects;
  let api: BookcaseApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let shelf: Shelf;
  let bookcase: Bookcase;
  let book: Book;

  book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
  book.setBookId(1);
  book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };
  book.authors = [new BookAuthor(1, UUID.UUID())];
  book.cover = new BookCover(CoverType.hardCover().id, undefined, false);
  book.description = new BookDescription('content', 'source');
  book.series = new BookSeries(1, UUID.UUID(), 1);
  book.hashTags = [{ hashTagValue: '#hashTag' }];

  shelf = new Shelf(CUSTOM_SHELF.id, 'NEW_SHELF');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);
  bookcase.addToShelf(shelf.identification.id, book.identification.id);



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        provideMockStore<RemoveBookcaseBookState>({}),
        provideMockActions(() => actions$),
        RemoveBookcaseBookEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        {
          provide: RemoveBookcaseBookFacade,
          useValue: {
            bookRemovedFromShelf$: of(book),
            shelfThatContainedBook$: of(shelf),
            removedBookFromBookcase$: of(book)
          }
        }
      ]
    });

    effects = TestBed.get(RemoveBookcaseBookEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('REMOVE_BOOK_FROM_SHELF$', () => {
    it('should assign REMOVE_BOOK_FROM_SHELF_SUCCESS when api action was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_SHELF({ payload: { bookcase, shelf, book } });

        spyOn(api, 'removeFromShelf').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = REMOVE_BOOK_FROM_SHELF_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.removeBookFromShelf$).toBe('b', { b: completion });
      });

    });

    it('should assign REMOVE_BOOK_FROM_SHELF_FALIURE when api action was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_SHELF({ payload: { bookcase, shelf, book } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeFromShelf').and.returnValue(response);

        const completion = REMOVE_BOOK_FROM_SHELF_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeBookFromShelf$)
          .toBe('-b', { b: completion });

      });

    });
  });

  describe('REMOVE_BOOK_FROM_SHELF_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW and ADD_OR_UPDATE_BOOKCASE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_SHELF_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } })

        expectObservable(effects.removeBookFromShelfSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });

    })
  });


  describe('REMOVE_BOOK_FROM_BOOKCASE$', () => {
    it('should assign REMOVE_BOOK_FROM_BOOKCASE_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_BOOKCASE({ payload: { bookcase, book, shelfs: [shelf] } });

        spyOn(api, 'removeFromBookcase').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = REMOVE_BOOK_FROM_BOOKCASE_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.removeBookFromBookcase$)
          .toBe('b', { b: completion });

      })

    });

    it('should assign REMOVE_BOOK_FROM_BOOKCASE_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_BOOKCASE({ payload: { bookcase, book, shelfs: [shelf] } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeFromBookcase').and.returnValue(response);

        const completion = REMOVE_BOOK_FROM_BOOKCASE_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeBookFromBookcase$)
          .toBe('-b', { b: completion });
      });

    });
  });

  describe('REMOVE_BOOK_FROM_BOOKCASE_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW and ADD_OR_UPDATE_BOOKCASE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = REMOVE_BOOK_FROM_BOOKCASE_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } });

        expectObservable(effects.removeBookFromBookcaseSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      });

    });
  });

});
