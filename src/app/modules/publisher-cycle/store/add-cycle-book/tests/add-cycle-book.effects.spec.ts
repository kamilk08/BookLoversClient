import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { PublisherCycleApi } from "src/app/modules/api/cycles/publisher-cycle.api";
import { AddCycleBookEffects } from "../add-cycle-book.effects";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { UUID } from "angular2-uuid";
import { Book, BookAuthor, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { PublisherCycleFacade } from "../../publisher-cycles/publisher-cycle.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ApiError } from "src/app/modules/api/api-error.model";
import * as fromActions from '../add-cycle-book.actions';

describe('ADD_CYCLE_BOOK_EFFECTS', () => {

  let effects: AddCycleBookEffects;
  let api: PublisherCycleApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddCycleBookEffects])
      ],
      providers: [
        AddCycleBookEffects,
        PublisherCycleFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore({}),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AddCycleBookEffects);
    api = TestBed.get(PublisherCycleApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('ADD_CYCLE_BOOK$', () => {
    it('should assign ADD_CYCLE_BOOK_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });
        const book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
          new BookPublisher(1, UUID.UUID(), new Date()));

        const action = fromActions.ADD_CYCLE_BOOK({ payload: { book, cycle } });

        actions$ = hot('a', { a: action });

        spyOn(api, 'addCycleBook').and.returnValue(of({}));

        const completion = fromActions.ADD_CYCLE_BOOK_SUCCESS({ payload: {} });

        expectObservable(effects.addCycleBook$)
          .toBe('b', { b: completion });
      })

    });

    it('should assign ADD_CYCLE_BOOK_FALIURE action when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const cycle = new PublisherCycle('cycle', { id: 1, guid: UUID.UUID() });
        const book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [new BookAuthor(1, UUID.UUID())],
          new BookPublisher(1, UUID.UUID(), new Date()));

        const action = fromActions.ADD_CYCLE_BOOK({ payload: { book, cycle } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addCycleBook').and.returnValue(response);

        const completion = fromActions.ADD_CYCLE_BOOK_FALIURE({ payload: { model: error } });

        expectObservable(effects.addCycleBook$)
          .toBe('--b', { b: completion });
      });

    });
  });

});
