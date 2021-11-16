import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { ChangeShelfEffects } from "../change-shelf.effects";

import * as fromActions from '../change-shelf.actions';
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { UUID } from "angular2-uuid";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { Book, BookAuthor, BookBasics, BookCover, BookDescription, BookPublisher, BookSeries } from "src/app/modules/api/books/models";
import { CoverType } from "src/app/modules/api/books/models/cover-type";
import { ChangeShelfFacade } from "../change-shelf.facade";
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ChangeShelfState } from "../change-shelf.reducer";

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
book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };
book.authors = [new BookAuthor(1, UUID.UUID())];
book.cover = new BookCover(CoverType.hardCover().id, undefined, false);
book.description = new BookDescription('content', 'source');
book.series = new BookSeries(1, UUID.UUID(), 1);
book.hashTags = [{ hashTagValue: '#hashTag' }];

describe('CHANGE_SHELF_EFFECTS', () => {

  let effects: ChangeShelfEffects;
  let scheduler: TestScheduler;
  let api: BookcaseApi;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ChangeShelfEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<ChangeShelfState>({}),
        provideMockActions(() => actions$),
        {
          provide: ChangeShelfFacade,
          useValue: {
            oldShelf$: of(oldShelf),
            newShelf$: of(newShelf),
            book$: of(book)
          }
        }
      ]
    });

    effects = TestBed.get(ChangeShelfEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(BookcaseApi);
  });

  describe('CHANGE_SHELF$', () => {
    it('should assign CHANGE_SHELF_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.CHANGE_SHELF({ payload: { bookcase, shelves: { oldShelf, newShelf }, book } });

        spyOn(api, 'changeShelf').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_SHELF_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.changeShelf$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign CHANGE_SHELF_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.CHANGE_SHELF({ payload: { bookcase, shelves: { oldShelf, newShelf }, book } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changeShelf').and.returnValue(response);

        const completion = fromActions.CHANGE_SHELF_FALIURE({ payload: { model: error } });

        expectObservable(effects.changeShelf$).toBe('-b', { b: completion });
      })
    });
  });

  describe('CHANGE_SHELF_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW,ADD_OR_UPDATE_BOOKCASE and SHOW_SUCCESS_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.CHANGE_SHELF_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } });
        const thirdAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf changed successfully.😊' } });

        expectObservable(effects.changeShelfSuccess$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });

      });
    })
  });

});
