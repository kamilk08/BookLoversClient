import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { Quote } from "src/app/modules/api/quotes/models/quote.model";
import * as fromIndex from '../index';
import * as fromSelectors from '../module.selectors';
import { ADD_OR_REMOVE_QUOTE_LIKE, CHANGE_AUTHOR_BOOKS_PAGE, CHANGE_AUTHOR_QUOTES_PAGE, CHANGE_AUTHOR_SERIES_PAGE, OPEN_AUTHOR_REMOVE_MODAL, OPEN_EDIT_AUTHOR_MODAL, SEARCH_AUTHOR_BOOKS, SET_AUTHOR_ID_ON_AUTHOR_WEB_PAGE, SET_MAX_BOOKS_PER_PAGE, SET_MAX_QUOTES_PER_PAGE, SET_MAX_SERIES_PER_PAGE } from "./author-web-page.actions";

@Injectable()
export class AuthorWebPageFacade {

  public readonly authorId$ = this.store.select(fromSelectors.authorId);
  public readonly maxQuotesCount$ = this.store.select(fromSelectors.maxQuotesCount);
  public readonly maxBooksCount$ = this.store.select(fromSelectors.maxBooksCount);
  public readonly maxSeriesCount$ = this.store.select(fromSelectors.maxSeriesCount);
  public readonly maxSeriesBooksCount$ = this.store.select(fromSelectors.maxSeriesBooksCount);
  public readonly searchPhrase$ = this.store.select(fromSelectors.searchPhrase);

  constructor(private store: Store<fromIndex.AuthorsModuleState>) { }

  setAuthorId(authorId: number) {
    this.store.dispatch(SET_AUTHOR_ID_ON_AUTHOR_WEB_PAGE({ payload: { authorId } }));
  }

  setQuotesCount(count: number) {
    this.store.dispatch(SET_MAX_QUOTES_PER_PAGE({ payload: { count } }));
  }

  setBooksCount(count: number) {
    this.store.dispatch(SET_MAX_BOOKS_PER_PAGE({ payload: { count } }));
  }

  setSeriesCount(count: number) {
    this.store.dispatch(SET_MAX_SERIES_PER_PAGE({ payload: { count } }));
  }

  addOrRemoveQuoteLike(quote: Quote) {
    this.store.dispatch(ADD_OR_REMOVE_QUOTE_LIKE({ payload: { quote } }))
  }

  searchAuthorBooks(phrase: string) {
    this.store.dispatch(SEARCH_AUTHOR_BOOKS({ payload: { phrase } }));
  }

  openEditAuthorModal(author: Author) {
    this.store.dispatch(OPEN_EDIT_AUTHOR_MODAL({ payload: { author } }));
  }

  openRemoveAuthorModal(author: Author) {
    this.store.dispatch(OPEN_AUTHOR_REMOVE_MODAL({ payload: { author } }));
  }

  changeBooksPage(page: number) {
    this.store.dispatch(CHANGE_AUTHOR_BOOKS_PAGE({ payload: { page } }))
  }

  changeSeriesPage(page: number) {
    this.store.dispatch(CHANGE_AUTHOR_SERIES_PAGE({ payload: { page } }));
  }

  changeQuotesPage(page: number) {
    this.store.dispatch(CHANGE_AUTHOR_QUOTES_PAGE({ payload: { page } }));
  }
}
