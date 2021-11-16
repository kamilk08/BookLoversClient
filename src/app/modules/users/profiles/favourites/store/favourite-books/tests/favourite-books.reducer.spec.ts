import { FavouriteBooksState } from "../favourite-books.reducer";

import * as fromActions from '../favourite-books.actions';
import * as fromReducer from '../favourite-books.reducer';
import { FavouriteBook } from "src/app/modules/api/profiles/favourites/models/favourite-book.model";
import { UUID } from "angular2-uuid";

describe('FAVOURITE_BOOKS_REDUCER', () => {

  const initialState: FavouriteBooksState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_FAVOURITE_BOOKS', () => {
    it('should return new state with processing property set to true', () => {

      const readerId = 1;

      const action = fromActions.SELECT_FAVOURITE_BOOKS({ payload: { readerId } });

      const newState = fromReducer.favouriteBooksReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('UPSERT_FAVOURITE_BOOKS', () => {
    it('should return new state with updated entities property', () => {

      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId, favourites: [] } });

      const state = fromReducer.favouriteBooksReducer(initialState, firstAction);

      const secondAction = fromActions.UPSERT_FAVOURITE_BOOKS({ payload: { readerId, favourite: new FavouriteBook(UUID.UUID()) } });

      const newState = fromReducer.favouriteBooksReducer(state, secondAction);

      expect(newState.entities[readerId][0]).toEqual(secondAction.payload.favourite);

    });
  });

  describe('REMOVE_FAVOURITE_BOOK', () => {
    it('should return new state with removed favourite book from entities property', () => {

      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId, favourites: [] } });

      const state = fromReducer.favouriteBooksReducer(initialState, firstAction);

      const secondAction = fromActions.UPSERT_FAVOURITE_BOOKS({ payload: { readerId, favourite: new FavouriteBook(UUID.UUID()) } });

      const secondState = fromReducer.favouriteBooksReducer(state, secondAction);

      const action = fromActions.REMOVE_BOOK_FROM_FAVOURITES({ payload: { readerId, bookGuid: secondAction.payload.favourite.bookGuid } });

      const newState = fromReducer.favouriteBooksReducer(secondState, action);

      expect(newState.entities[readerId].length).toEqual(0);

    });
  });

  describe('FETCH_FAVOURITE_BOOKS', () => {
    it('should return new state with updated entities property', () => {

      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_BOOKS({ payload: { readerId, favourites: [new FavouriteBook(UUID.UUID())] } });

      const state = fromReducer.favouriteBooksReducer(initialState, firstAction);

      expect(state.entities[readerId].length).toEqual(1);
    });

  });

});
