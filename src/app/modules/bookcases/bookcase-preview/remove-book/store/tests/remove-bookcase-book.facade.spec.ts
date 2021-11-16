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
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { removeBookcaseBookReducer } from ".."
import { RemoveBookcaseBookFacade } from "../remove-bookcase-book.facade";

describe('REMOVE_BOOKCASE_BOOK_FACADE', () => {

  let facade: RemoveBookcaseBookFacade;

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
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('remove-bookcase-book', removeBookcaseBookReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        RemoveBookcaseBookFacade
      ]
    });

    facade = TestBed.get(RemoveBookcaseBookFacade);
  });

  describe('REMOVE_FROM_SHELF', () => {
    it('should dispatch an action and bookRemovedFromShelf$ and shelfThatContainedBook$ should emit new value', async (done) => {

      facade.removeFromShelf(bookcase, shelf, book);

      const subscription = combineLatest(facade.bookRemovedFromShelf$, facade.shelfThatContainedBook$)
        .pipe(
          map(stream => { return { book: stream[0], shelf: stream[1] } })
        ).subscribe(val => {
          expect(val.book.identification.guid).toEqual(book.identification.guid);
          expect(val.shelf.identification.guid).toEqual(shelf.identification.guid)
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('REMOVE_FROM_BOOKCASE', () => {
    it('should dispatch an action and removedBookFromBookcase$ should emit new value', async (done) => {

      facade.removeFromBookcase(bookcase, book);

      const subscription = facade.removedBookFromBookcase$
        .subscribe(val => {
          expect(val).toEqual(book);
          done();
        });

      subscription.unsubscribe();
    });
  });

});
