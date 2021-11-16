import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { RemoveShelfEffects } from "../remove-shelf.effects";
import { RemoveShelfFacade } from "../remove-shelf.facade";

import * as fromActions from '../remove-shelf.actions';
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { provideMockActions } from "@ngrx/effects/testing";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { provideMockStore } from "@ngrx/store/testing";
import { RemoveShelfState } from "../remove-shelf.reducer";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('REMOVE_SHELF_EFFECTS', () => {

  let effects: RemoveShelfEffects;
  let api: BookcaseApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let bookcase: Bookcase;
  let shelf: Shelf = new Shelf(CUSTOM_SHELF.id, 'name');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule

      ],
      providers: [
        provideMockStore<RemoveShelfState>({}),
        provideMockActions(() => actions$),
        ApiErrorAdapter,
        ErrorActions,
        RemoveShelfEffects,
        MesssagesFacade,
        ErrorsFacade,
        {
          provide: RemoveShelfFacade,
          useValue: {
            shelfToRemove$: of(shelf)
          }
        }
      ]
    });

    effects = TestBed.get(RemoveShelfEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('REMOVE_SHELF$', () => {
    it('should assign REMOVE_SHELF_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_SHELF({ payload: { bookcase, shelf } });

        spyOn(api, 'removeShelf').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.REMOVE_SHELF_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.removeShelf$).toBe('b', { b: completion });
      });

    });

    it('should assign REMOVE_SHELF_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_SHELF({ payload: { bookcase, shelf } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeShelf').and.returnValue(response);

        const completion = fromActions.REMOVE_SHELF_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeShelf$).toBe('-b', { b: completion });
      });
    });
  });

  describe('REMOVE_SHELF_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW or ADD_OR_UPDATE_BOOKCASE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_SHELF_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } });
        const thirdAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf removed succesfully.😊' } });

        expectObservable(effects.removeShelfSuccess$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });
      });

    });
  })

});
