import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { AddBookApi } from "src/app/modules/api/books/add/add-book.api";
import { ProcessBookEffects } from "../process-book.effects";

import * as fromActions from '../process-book.actions';
import { Book, BookAuthor, BookBasics, BookCover, BookDescription, BookDetails, BookPublisher, BookSeries } from "src/app/modules/api/books/models";
import { UUID } from "angular2-uuid";
import { AddBookResponse } from "src/app/modules/api/books/add/responses/add-book.response";
import { FETCH_BOOK } from "../../../store/book.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { FICTION_SUBCATEGORIES } from "../../../common/categories";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { AddBookState } from "..";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('PROCESS_BOOK_EFFECTS', () => {

  let effects: ProcessBookEffects;
  let api: AddBookApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ProcessBookEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<AddBookState>({}),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProcessBookEffects);
    api = TestBed.get(AddBookApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });


  describe('addBook$', () => {

    it('should dispatch ADD_BOOK_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        let response: AddBookResponse = {
          bookDto: undefined,
          pictureDto: undefined,
          bookId: 1
        }

        spyOn(api, 'addBook').and.returnValue(of(response));

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

        const completion = fromActions.ADD_BOOK_SUCCESS({ payload: { book } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.addBook$).toBe('b', { b: completion });
      })

    });

    it('should dispatch ADD_BOOK_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

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

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addBook').and.returnValue(response as any);

        const completion = fromActions.ADD_BOOK_FALIURE({ payload: { model: error } });

        expectObservable(effects.addBook$)
          .toBe('--b', { b: completion });
      })

    })

  });

  describe('addBookSuccess$', () => {
    it('should dispatch three different actions', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        let book = new Book(new BookBasics('title', '12455', FICTION_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
          new BookPublisher(1, UUID.UUID(), new Date()));
        book.details = new BookDetails(100, 1);
        book.cover = new BookCover(1, 'source', false);
        book.description = new BookDescription(undefined, undefined);
        book.series = new BookSeries(1, UUID.UUID(), 1);
        book.publisherCycles = []
        book.hashTags = []
        book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };

        book.setBookId(1);

        const action = fromActions.ADD_BOOK_SUCCESS({ payload: { book } });

        actions$ = hot('a', { a: action });

        const fetchBookAction = FETCH_BOOK({ payload: { book } });
        const messageAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book created sucessfully.😊' } });
        const moveToAction = MOVE_TO({ payload: { moveTo: { path: [`book/${book.identification.id}`] } } })

        expectObservable(effects.addBookSuccess$)
          .toBe('(bcd)', {
            b: fetchBookAction,
            c: messageAction,
            d: moveToAction
          });

      })



    })
  });

});
