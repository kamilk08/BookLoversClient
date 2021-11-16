import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FavouritesApi } from "src/app/modules/api/profiles/favourites/favourites.api";
import { FavouriteBooksEffects } from "../favourite-books.effects";

import * as fromActions from '../favourite-books.actions';
import { provideMockActions } from "@ngrx/effects/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { FavouriteBooksState } from "../favourite-books.reducer";

describe('FAVOURITE_BOOKS_EFFECTS', () => {

  let effects: FavouriteBooksEffects;
  let api: FavouritesApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule
      ],
      providers: [
        FavouriteBooksEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
        provideMockStore<FavouriteBooksState>({})
      ]
    });

    effects = TestBed.get(FavouriteBooksEffects);
    api = TestBed.get(FavouritesApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_FAVOURITE_BOOKS$', () => {
    it('should assign FETCH_FAVOURITE_BOOKS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_FAVOURITE_BOOKS({ payload: { readerId } });

        spyOn(api, 'getFavouriteBooks').and.returnValue(of([]));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId, favourites: [] } });

        expectObservable(effects.selectFavouriteBooks$)
          .toBe('b', { b: completion });
      });
    });
    it('should assign FETCH_FAVOURITE_BOOKS_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_FAVOURITE_BOOKS({ payload: { readerId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getFavouriteBooks').and.returnValue(response as any);

        const completion = fromActions.FETCH_FAVOURITE_BOOK_FALIURE({ payload: { error } });

        expectObservable(effects.selectFavouriteBooks$)
          .toBe('-b', { b: completion });
      });

    });
  });

  describe('FETCH_FAVOURITE_BOOKS$', () => {
    it('should assign FAVOURITE_BOOKS_SELECTED after 4s', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId: 1, favourites: [] } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FAVOURITE_BOOKS_SELECTED();

        expectObservable(effects.fetchFavouriteBooks$)
          .toBe('1.5s b', { b: completion });
      })

    });
  });

});
