import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { BookApi } from "src/app/modules/api/books/book.api";
import { Book, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { booksStateReducer } from "..";
import { ALL_SUBCATEGORIES } from "../../common/categories";
import { BookEffects } from "../book.effects";
import { BookFacade } from "../book.facade";
import { SearchBookEffects } from "../search/search-book.effects";

describe('BOOK_FACADE', () => {

  let bookFacade: BookFacade;
  let api: BookApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('books', booksStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BookEffects, SearchBookEffects])
      ],
      providers: [
        BookApi,
        BookAdapter,
        BookFacade,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    bookFacade = TestBed.get(BookFacade);
    api = TestBed.get(BookApi);
  });

  describe('selectBook', () => {
    it('invoking selectBook should dispatch action and bookById$ should emit new value', async (done) => {

      let book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
      book.setBookId(1);

      spyOn(api, 'getBookById').and.returnValue(of(book));

      bookFacade.selectBook(book.identification.id);

      bookFacade.bookById$(book.identification.id)
        .subscribe(val => {
          expect(val).toBe(book);
          done();
        })

    });
  });

  describe('selectMultipleBooksById', () => {
    it('invoking selectMultipleBooks should dispatch action and multipleBooks$ observable should emit new value', async (done) => {

      let book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
      book.setBookId(1);

      spyOn(api, 'getBooksByIds')
        .and.returnValue(of([book]));

      bookFacade.selectMultipleBooksById([book.identification.id]);

      bookFacade.multipleBooks$([book.identification.id])
        .subscribe(val => {
          expect(val).toEqual([book]);
          done();
        })
    });
  });

  describe('searchBookByTitle', () => {

    it('invoking searchBookByTitle method shold dispatch action and filteredBooksByTitle$ observable should emit new value', async (done) => {

      let book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
      book.setBookId(1);

      spyOn(api, 'searchBookByTitle').and.returnValue(of([book]));

      bookFacade.searchBookByTitle(DEFAULT_QUERY());

      bookFacade.filteredBooksByTitle$
        .subscribe(val => {
          expect(val).toEqual([book]);
          done();
        })

    })

  })



});
