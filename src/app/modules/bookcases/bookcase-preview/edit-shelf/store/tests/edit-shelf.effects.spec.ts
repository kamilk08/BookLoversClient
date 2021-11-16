import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { EditShelfEffects } from "../edit-shelf.effects";
import { EditShelfFacade } from "../edit-shelf.facade";

import * as fromActions from '../edit-shelf.actions';
import { UUID } from "angular2-uuid";
import { ADD_OR_UPDATE_BOOKCASE } from "src/app/modules/bookcases/store/bookcases/bookcase.actions";
import { ADD_OR_UPDATE_BOOKCASE_PREVIEW } from "../../../store/bookcase-preview.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { EditShelfState } from "../edit-shelf.reducer";
import { provideMockStore } from "@ngrx/store/testing";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('EDIT_SHELF_EFFECTS', () => {

  let effects: EditShelfEffects;
  let api: BookcaseApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  let shelfName = 'SHELF_NAME';
  let editedShelf = new Shelf(CUSTOM_SHELF.id, 'SHELF');
  editedShelf.setShelfId(1);

  let bookcase: Bookcase;

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(editedShelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<EditShelfState>({}),
        EditShelfEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        {
          provide: EditShelfFacade,
          useValue: {
            editedShelf$: of(editedShelf),
            shelfName$: of(shelfName)
          }
        }
      ]
    });

    effects = TestBed.get(EditShelfEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('EDIT_SHELF$', () => {
    it('should assign EDIT_SHELF_SUCCESS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_CUSTOM_SHELF_NAME({ payload: { bookcase, shelf: editedShelf, shelfName, oldShelfName: editedShelf.name } });

        spyOn(api, 'editShelfsName').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const completion = fromActions.EDIT_CUSOTM_SHELF_SUCCESS({ payload: { bookcase } });

        expectObservable(effects.editShelfName$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign EDIT_SHELF_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_CUSTOM_SHELF_NAME({ payload: { bookcase, shelf: editedShelf, shelfName, oldShelfName: editedShelf.name } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'editShelfsName').and.returnValue(response);

        const completion = fromActions.EDIT_CUSTOM_SHELF_NAME_FALIURE({ payload: { model: error } });

        expectObservable(effects.editShelfName$)
          .toBe('-b', { b: completion });
      });

    });
  });

  describe('EDIT_SHELF_SUCCESS$', () => {
    it('should assign UPSERT_BOOKCASE_PREVIEW and ADD_OR_UPDATE_BOOKCASE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_CUSOTM_SHELF_SUCCESS({ payload: { bookcase } });

        actions$ = hot('a', { a: action });

        const firstAction = ADD_OR_UPDATE_BOOKCASE_PREVIEW({ payload: { bookcase } });
        const secondAction = ADD_OR_UPDATE_BOOKCASE({ payload: { bookcase } });
        const thirdAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Shelf edited succesfully.😊' } });

        expectObservable(effects.editCustomShelfNameSuccess$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });
      })

    })
  })

});
