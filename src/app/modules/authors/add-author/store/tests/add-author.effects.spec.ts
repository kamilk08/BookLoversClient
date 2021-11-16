import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { AddAuthorApi } from "src/app/modules/api/authors/add-author/add-author.api";
import { addAuthorStateReducer } from "..";
import { AddAuthorEffects } from "../add-author-state/add-author.effects";

import * as fromActions from '../add-author-state/add-author.actions';
import { AddAuthorModel } from "src/app/modules/api/authors/add-author/models/add-author.model";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('add author effects', () => {
  let actions$: Observable<Action> = new Observable<Action>();
  let effects: AddAuthorEffects;
  let api: AddAuthorApi;
  let scheduler: TestScheduler

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-author', addAuthorStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forRoot([AddAuthorEffects])
      ],
      providers: [AddAuthorApi,
        AddAuthorEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AddAuthorEffects);
    api = TestBed.get(AddAuthorApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })

  describe('addAuthor$', () => {
    it('should dispatch ADD_AUTHOR_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        let model: AddAuthorModel;

        const action = fromActions.ADD_AUTHOR({ payload: { model } });
        const completion = fromActions.ADD_AUTHOR_SUCCESS({ payload: { authorId: 1 } });

        const addAuthorResponse = {
          authorWriteModel: { authorId: 1 }
        };

        spyOn(api, 'addAuthor').and.returnValue(of(addAuthorResponse))

        actions$ = hot('a', { a: action });

        expectObservable(effects.addAuthor$).toBe('b', { b: completion });
      })

    });

    it('should dispatch ADD_AUTHOR_FALIURE action when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        let model: AddAuthorModel;
        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }


        const action = fromActions.ADD_AUTHOR({ payload: { model } });
        const completion = fromActions.ADD_AUTHOR_FALIURE({ payload: { model: error } });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addAuthor').and.returnValue(response);

        expectObservable(effects.addAuthor$)
          .toBe('--b', { b: completion });
      })
    })
  })

  describe('addAuthorSuccess$', () => {
    it('should dispatch SHOW_SUCCESSS_MESSAGE action AND MOVE_TO action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_AUTHOR_SUCCESS({ payload: { authorId: 1 } });
        const firstAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author added succesfully.😊' } });
        const secondAction = MOVE_TO({ payload: { moveTo: { path: ['author', action.payload.authorId] } } })
        actions$ = hot('a', { a: action });

        expectObservable(effects.addAuthorSuccess$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      })
    });
  });
});
