import { FavouriteAuthorsState } from "../favourite-authors.reducer";

import * as fromActions from '../favourite-authors.actions';
import * as fromReducer from '../favourite-authors.reducer';
import { FavouriteAuthor } from "src/app/modules/api/profiles/favourites/models/favourite-author.model";
import { UUID } from "angular2-uuid";

describe('FAVOURITE_AUTHOR_REDUCER', () => {

  const initialState: FavouriteAuthorsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_FAVOURITE_AUTHORS', () => {
    it('should return new state with processing property set to true', () => {

      const readerId = 1;

      const action = fromActions.SELECT_FAVOURITE_AUTHORS({ payload: { readerId } });

      const newState = fromReducer.favouriteAuthorsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('UPSERT_FAVOURITE_AUTHORS', () => {
    it('should return new state with updated entities property', () => {

      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId, favourites: [] } });

      const state = fromReducer.favouriteAuthorsReducer(initialState, firstAction);

      const secondAction = fromActions.UPSERT_FAVOURITE_AUTHORS({ payload: { readerId, favourite: new FavouriteAuthor(UUID.UUID()) } });

      const newState = fromReducer.favouriteAuthorsReducer(state, secondAction);

      expect(newState.entities[readerId][0]).toEqual(secondAction.payload.favourite);

    });
  });

  describe('REMOVE_FAVOURITE_AUTHOR', () => {
    it('should return new state with removed favourite author from entities property', () => {

      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId, favourites: [] } });

      const state = fromReducer.favouriteAuthorsReducer(initialState, firstAction);

      const secondAction = fromActions.UPSERT_FAVOURITE_AUTHORS({ payload: { readerId, favourite: new FavouriteAuthor(UUID.UUID()) } });

      const secondState = fromReducer.favouriteAuthorsReducer(state, secondAction);

      const action = fromActions.REMOVE_FROM_FAVOURITES_AUTHOR({ payload: { readerId, favouriteGuid: secondAction.payload.favourite.authorGuid } });

      const newState = fromReducer.favouriteAuthorsReducer(secondState, action);

      expect(newState.entities[readerId].length).toEqual(0);

    });
  });

  describe('FETCH_FAVOURITE_AUTHORS', () => {
    it('should return new state with updated entities property', () => {
      const readerId = 1;

      const firstAction = fromActions.FETCH_FAVOURITE_AUTHORS({ payload: { readerId, favourites: [new FavouriteAuthor(UUID.UUID())] } });

      const state = fromReducer.favouriteAuthorsReducer(initialState, firstAction);

      expect(state.entities[readerId].length).toEqual(1);
    });

  });

});
