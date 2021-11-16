import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_FAVOURITE_AUTHORS } from './favourite-authors/favourite-authors.actions';
import { SELECT_FAVOURITE_BOOKS } from './favourite-books/favourite-books.actions';

import * as fromSelectors from './favourties.selectors';
import * as fromModule from '../store/index';
@Injectable()
export class FavouritesFacade {

  public readonly processingNewAuthor$ = this.store.select(fromSelectors.processingNewFavouriteAuthor);
  public readonly processingNewBook$ = this.store.select(fromSelectors.processingNewFavouriteBook);
  public readonly selectingFavouriteAuthors$ = this.store.select(fromSelectors.selectingFavouriteAuthors);
  public readonly selectingFavouriteBooks$ = this.store.select(fromSelectors.selectingFavouriteBooks);;

  public readonly favouriteAuthors$ = (readerId: number) => this.store.select(fromSelectors.favouriteAuthors(readerId));
  public readonly favouriteBooks$ = (readerId: number) => this.store.select(fromSelectors.favouriteBooks(readerId));

  constructor(private store: Store<fromModule.FavouritesModuleState>) { }

  selectFavouriteAuthors(readerId: number) {
    this.store.dispatch(SELECT_FAVOURITE_AUTHORS({ payload: { readerId } }))
  }

  selectFavouriteBooks(readerId: number) {
    this.store.dispatch(SELECT_FAVOURITE_BOOKS({ payload: { readerId } }));
  }

}
