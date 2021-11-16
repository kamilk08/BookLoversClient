import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "src/app/modules/api/api.module";
import { ChangeShelfEffects } from "../change-shelf.effects";
import { ChangeShelfFacade } from "../change-shelf.facade";
import { changeShelfReducer } from "../change-shelf.reducer";
import { UUID } from "angular2-uuid";
import { Book, BookBasics, BookPublisher, BookAuthor, BookCover, BookDescription, BookSeries } from "src/app/modules/api/books/models";
import { CoverType } from "src/app/modules/api/books/models/cover-type";
import { Shelf, Bookcase } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";

describe('CHANGE_SHELF_FACADE', () => {

  let facade: ChangeShelfFacade;

  let oldShelf: Shelf;
  let newShelf: Shelf;
  let bookcase: Bookcase;
  let book: Book;

  oldShelf = new Shelf(CUSTOM_SHELF.id, 'OLD_SHELF');
  oldShelf.setShelfId(1);
  oldShelf.identification.guid = UUID.UUID();

  newShelf = new Shelf(CUSTOM_SHELF.id, 'NEW_SHELF');
  newShelf.setShelfId(2);
  newShelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(oldShelf);
  bookcase.addShelf(newShelf);

  book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
  book.setBookId(1);
  book.identification.guid = UUID.UUID();
  book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };
  book.authors = [new BookAuthor(1, UUID.UUID())];
  book.cover = new BookCover(CoverType.hardCover().id, undefined, false);
  book.description = new BookDescription('content', 'source');
  book.series = new BookSeries(1, UUID.UUID(), 1);
  book.hashTags = [{ hashTagValue: '#hashTag' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('change-shelf', changeShelfReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ChangeShelfEffects])
      ],
      providers: [
        ChangeShelfFacade,
        ChangeShelfEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(ChangeShelfFacade);
  });

  describe('CHANGE_SHELF', () => {
    it('should dispatch an action and as result of which oldShelf$,newShelf$,book$ observable should emit new value', async (done) => {

      facade.changeShelf(bookcase, { oldShelf, newShelf }, book);

      const subscription = combineLatest(facade.oldShelf$, facade.newShelf$, facade.book$)
        .pipe(
          map(stream => { return { oldShelf: stream[0], newShelf: stream[1], book: stream[2] } })
        ).subscribe(val => {
          expect(val.book.identification.guid).toEqual(book.identification.guid);
          expect(val.oldShelf.identification.guid).toEqual(oldShelf.identification.guid);
          expect(val.newShelf.identification.guid).toEqual(newShelf.identification.guid);
          done();
        });

      subscription.unsubscribe();
    });
  })

});
