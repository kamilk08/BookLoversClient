import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { Book, BookBasics, BookPublisher, BookAuthor, BookCover, BookDescription, BookSeries } from "src/app/modules/api/books/models";
import { CoverType } from "src/app/modules/api/books/models/cover-type";
import { Shelf, Bookcase } from "src/app/modules/bookcases/models";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { AddBookToShelfFacade } from "../add-book-to-shelf.facade";
import { addBookToBookcaseReducer } from "../add-book-to-shelf.reducer";

describe('ADD_BOOK_TO_SHELF_FACADE', () => {

  let facade: AddBookToShelfFacade;
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
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-book-to-shelf', addBookToBookcaseReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        AddBookToShelfFacade
      ]
    });

    facade = TestBed.get(AddBookToShelfFacade);
  })

  describe('ADD_TO_BOOKCASE', () => {
    it('should dispatch an action and as a result of which shelf$ and book$ observables should emit new value', async (done) => {

      facade.addToBookcase(bookcase, shelf, book);

      const subscription = combineLatest(facade.book$, facade.shelf$)
        .pipe(
          map(stream => { return { book: stream[0], shelf: stream[1] } })
        ).subscribe(val => {
          expect(val.book.identification.guid).toEqual(book.identification.guid);
          expect(val.shelf.identification.guid).toEqual(shelf.identification.guid);
          done();
        });

      subscription.unsubscribe();

    });
  })

});
