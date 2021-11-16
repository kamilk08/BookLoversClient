import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { Book, BookAuthor, BookBasics, BookCover, BookDescription, BookPublisher, BookSeries } from "src/app/modules/api/books/models";
import { CoverType } from "src/app/modules/api/books/models/cover-type";
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { AddBookToShelfEffects } from "../add-book-to-shelf.effects";
import { AddBookToShelfFacade } from "../add-book-to-shelf.facade";
import { addBookToBookcaseReducer } from "../add-book-to-shelf.reducer";

import * as fromActions from '../add-book-to-shelf.actions';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_BOOK_TO_SHELF_EFFECTS', () => {

  let effects: AddBookToShelfEffects;
  let api: BookcaseApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let shelf: Shelf;
  let book: Book;
  let bookcase: Bookcase;

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

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorActions,
        ApiErrorAdapter,
        AddBookToShelfEffects,
        {
          provide: AddBookToShelfFacade,
          useValue: {
            shelf$: of(shelf),
            book$: of(book)
          }
        },
        provideMockActions(() => actions$),
        MesssagesFacade,
        ErrorsFacade
      ],
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-book-to-shelf', addBookToBookcaseReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddBookToShelfEffects])
      ]
    });

    effects = TestBed.get(AddBookToShelfEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_BOOK_TO_SHELF$', () => {
    it('should assign ADD_BOOK_TO_SHELF_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_BOOK_TO_SHELF({ payload: { bookcase, book, shelf } });

        spyOn(api, 'addBookToBookcase').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_BOOK_TO_SHELF_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.addBookToShelf$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign ADD_BOOK_TO_SHELF_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_BOOK_TO_SHELF({ payload: { bookcase, shelf, book } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addBookToBookcase').and.returnValue(response);

        const completion = fromActions.ADD_BOOK_TO_SHELF_FALIURE({ payload: { model: error } });

        expectObservable(effects.addBookToShelf$)
          .toBe('-b', { b: completion });
      })

    });
  });

  describe('ADD_BOOK_TO_SHELF_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW,ADD_OR_UPDATE_BOOKCASE and SHOW_SUCCESS_MESSAGE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_BOOK_TO_SHELF_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } });
        const thirdAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Book added successfully.😊' } })

        expectObservable(effects.addBookToShelfSuccess$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });

      });

    })
  })

});
