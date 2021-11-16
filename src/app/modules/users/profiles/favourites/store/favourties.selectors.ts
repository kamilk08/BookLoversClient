import { createSelector } from "@ngrx/store";
import { favouritesModuleSelector, FavouritesModuleState } from '.';
import { AddFavouriteState } from "./add-favourite/add-favourite.reducer";
import { FavouriteAuthorsState } from "./favourite-authors/favourite-authors.reducer";
import { FavouriteBooksState } from "./favourite-books/favourite-books.reducer";

const addFaviourState = createSelector(favouritesModuleSelector, (state: FavouritesModuleState) => {
  if (state) return state.addFavourite;

  return undefined;
});
const favouriteAuthorsState = createSelector(favouritesModuleSelector, (state: FavouritesModuleState) => {
  if (state) return state.favouriteAuthors;

  return undefined;
});
const favouriteBooksState = createSelector(favouritesModuleSelector, (state: FavouritesModuleState) => {
  if (state) return state.favouriteBooks;

  return undefined;
});

export const favouriteAuthors = (readerId: number) => createSelector(favouriteAuthorsState, (state: FavouriteAuthorsState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const favouriteBooks = (readerId: number) => createSelector(favouriteBooksState, (state: FavouriteBooksState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const selectingFavouriteAuthors = createSelector(favouriteAuthorsState, (state: FavouriteAuthorsState) => {
  if (state) return state.processing;

  return undefined;
});
export const selectingFavouriteBooks = createSelector(favouriteBooksState, (state: FavouriteBooksState) => {
  if (state) return state.processing;

  return undefined;
});
export const processingNewFavouriteAuthor = createSelector(addFaviourState, (state: AddFavouriteState) => {
  if (state) return state.processingAuthor;

  return undefined;
});
export const processingNewFavouriteBook = createSelector(addFaviourState, (state: AddFavouriteState) => {
  if (state) return state.processingBook;

  return undefined;
});
