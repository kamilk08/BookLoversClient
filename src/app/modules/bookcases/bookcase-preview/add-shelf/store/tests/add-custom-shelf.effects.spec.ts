import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { AddCustomShelfEffects } from "../add-custom-shelf.effects";
import { AddShelfFacade } from "../add-custom-shelf.facade";

import * as fromActions from '../add-custom-shelf.actions';
import { provideMockActions } from "@ngrx/effects/testing";
import { AddShelfResponse } from "src/app/modules/api/bookcases/api/responses/add-shelf.response";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { AddShelfState } from "../add-custom-shelf.reducer";

describe('ADD_CUSTOM_SHELF_EFFECTS', () => {

  let effects: AddCustomShelfEffects
  let api: BookcaseApi;
  let scheduler: TestScheduler
  let actions$: Observable<Action> = new Observable<Action>();

  let shelf: Shelf;
  let bookcase: Bookcase;

  shelf = new Shelf(1, 'TEST_SHELF');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
      ],
      providers: [
        AddCustomShelfEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<AddShelfState>({}),
        provideMockActions(() => actions$),
        {
          provide: AddShelfFacade,
          useValue: {
            addedShelf$: of(shelf),
          }
        }
      ]
    });

    effects = TestBed.get(AddCustomShelfEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })

  describe('ADD_SHELF$', () => {
    it('it should assign ADD_SHELF_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_CUSTOM_SHELF({ payload: { bookcase, shelf } });

        const shelfResponse: AddShelfResponse = {
          bookcaseGuid: UUID.UUID(),
          shelfGuid: UUID.UUID(),
          shelfId: 1,
          shelfName: 'shelfName'
        };

        spyOn(api, 'addShelf').and.returnValue(of(shelfResponse))

        actions$ = hot('a', { a: action });

        const completion = fromActions.ADD_CUSTOM_SHELF_SUCCESS({ payload: { bookcase, shelfResponse } });

        expectObservable(effects.addShelf$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign ADD_SHELF_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_CUSTOM_SHELF({ payload: { bookcase, shelf } });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: undefined,
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }
        actions$ = hot('a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addShelf').and.returnValue(response as any);

        const completion = fromActions.ADD_CUSTOM_SHELF_FALIURE({ payload: { model: error } });

        expectObservable(effects.addShelf$)
          .toBe('-b', { b: completion });
      });
    })
  });

  describe('ADD_SHELF_SUCCESS$', () => {
    it('should assign ADD_OR_UPDATE_BOOKCASE,UPSERT_BOOKCASE_PREVIEW and SHOW_SUCCESS_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const shelfResponse: AddShelfResponse = {
          bookcaseGuid: UUID.UUID(),
          shelfGuid: UUID.UUID(),
          shelfId: 1,
          shelfName: 'shelfName'
        };

        const action = fromActions.ADD_CUSTOM_SHELF_SUCCESS({ payload: { bookcase, shelfResponse } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase: bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase: bookcase } });
        const thirdAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf added succesfully.😊' } });

        expectObservable(effects.addShelfSuccess$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });
      })
    })
  })

});
