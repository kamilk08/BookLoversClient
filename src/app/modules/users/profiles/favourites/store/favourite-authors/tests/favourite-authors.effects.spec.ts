import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { FavouritesApi } from "src/app/modules/api/profiles/favourites/favourites.api";
import { FavouriteAuthorsEffects } from "../favourite-authors.effects";

import * as fromActions from '../favourite-authors.actions';
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('FAVOURITE_AUTHOR_EFFECTS', () => {

  let effects: FavouriteAuthorsEffects;
  let api: FavouritesApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [FavouriteAuthorsEffects,
        ApiErrorAdapter, provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(FavouriteAuthorsEffects);
    api = TestBed.get(FavouritesApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('SELECT_FAVOURITE_AUTHORS$', () => {
    it('should assign FETCH_FAVOURITE_AUTHORS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_FAVOURITE_AUTHORS({ payload: { readerId } });

        spyOn(api, 'getFavouriteAuthors').and.returnValue(of([]));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId, favourites: [] } });

        expectObservable(effects.selectFavouriteAuthors$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign FETCH_FAVOURITE_AUTHORS_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_FAVOURITE_AUTHORS({ payload: { readerId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getFavouriteAuthors').and.returnValue(response as any);

        const completion = fromActions.FETCH_FAVOURITE_AUTHORS_FALIURE({ payload: { error } });

        expectObservable(effects.selectFavouriteAuthors$)
          .toBe('-b', { b: completion });

      })

    });
  });

  describe('FETCH_FAVOURITE_AUTHORS$', () => {
    it('should assign FAVOURITE_AUTHORS_SELECTED action after 1s', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId: 1, favourites: [] } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FAVOURITE_AUTHORS_SELECTED();

        expectObservable(effects.fetchFavouriteAuthors$)
          .toBe('1.5s b', { b: completion });
      })
    });
  });

});
