import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import { FavouriteAuthorsEffects } from './favourite-authors/favourite-authors.effects';
import { FavouriteBooksEffects } from './favourite-books/favourite-books.effects';
import { AddFavouriteEffects } from './add-favourite/add-favourite.effects';
import { RemoveFavouriteEffects } from './remove-favourite/remove-favourite.effects';
import * as fromFavoruitesAuthors from './favourite-authors/favourite-authors.reducer';
import * as fromFavoruitesBooks from './favourite-books/favourite-books.reducer';
import * as fromAddFavourites from './add-favourite/add-favourite.reducer';
import * as fromRemoveFavourite from './remove-favourite/remove-favourite.reducer';

export interface FavouritesModuleState {
  addFavourite: fromAddFavourites.AddFavouriteState,
  removeFavourite: fromRemoveFavourite.RemoveFavouritesState,
  favouriteAuthors: fromFavoruitesAuthors.FavouriteAuthorsState,
  favouriteBooks: fromFavoruitesBooks.FavouriteBooksState
};

const reducerMap: ActionReducerMap<FavouritesModuleState> = {
  addFavourite: fromAddFavourites.addFavouriteReducer,
  removeFavourite: fromRemoveFavourite.removeFavouriteReducer,
  favouriteAuthors: fromFavoruitesAuthors.favouriteAuthorsReducer,
  favouriteBooks: fromFavoruitesBooks.favouriteBooksReducer
};

const reducer = combineReducers(reducerMap);

export function favouritesModuleReducer(state: FavouritesModuleState, action: Action) {
  return reducer(state, action);
};

export const favouritesModuleSelector = createFeatureSelector('favourites');

export const moduleEffects = [
  FavouriteAuthorsEffects,
  FavouriteBooksEffects,
  AddFavouriteEffects,
  RemoveFavouriteEffects]
