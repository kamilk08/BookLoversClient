import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { SELECT_AUTHOR, SELECT_AUTHOR_BY_GUID, SELECT_MULTIPLE_AUTHORS_BY_GUIDS, SELECT_MULTIPLE_AUTHORS_BY_IDS } from './author.actions';
import { FOLLOW_AUTHOR } from '../author-followers/follow-author/follow-author.actions';
import { UNFOLLOW_AUTHOR } from '../author-followers/unfollow-author/unfollow-author.actions';
import * as fromSelectors from '../module.selectors';
import * as fromModule from '../index';
import { REMOVE_AUTHOR } from '../remove-author/remove-author.actions';
import { Query } from 'src/app/modules/shared/common/query';
import { CLEAR_SEARCH_RESULTS, START_FILTERING_AUTHORS } from '../search-authors/search-author.actions';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { SELECT_AUTHOR_BOOKS } from '../author-books/author-books.actions';
import { AuthorBooksPageQuery } from '../../models/author-books-page.model';


@Injectable()
export class AuthorFacade {

  public readonly authorById$ = (authorId: number) => this.store.select(fromSelectors.authorById(authorId));
  public readonly authorByGuid$ = (authorGuid: UUID) => this.store.select(fromSelectors.authorByGuid(authorGuid));
  public readonly multipleAuthors$ = (authorIds: number[]) => this.store.select(fromSelectors.multipleAuthors(authorIds));
  public readonly multipleAuthorsByGuid$ = (authorGuids: UUID[]) => this.store.select(fromSelectors.multipleAuthorsByGuid(authorGuids));
  public readonly authorBooks$ = (authorId: number) => this.store.select(fromSelectors.authorBooks(authorId));
  public readonly multipleAuthorsBooks$ = (authorIds: number[]) => this.store.select(fromSelectors.multipleAuthorBooks(authorIds));

  public readonly authorGenres$ = (authorId: number) => this.store.select(fromSelectors.authorGenres(authorId));
  public readonly hasFollower$ = (authorId: number, userId: number) => this.store.select(fromSelectors.hasFollower(authorId, userId));
  public readonly hasBirthPlace$ = (authorId: number) => this.store.select(fromSelectors.hasBirthPlace(authorId));
  public readonly hasBirthDate$ = (authorId: number) => this.store.select(fromSelectors.hasBirthDate(authorId));
  public readonly hasSource$ = (authorId: number) => this.store.select(fromSelectors.hasSource(authorId));
  public readonly hasWebSite$ = (authorId: number) => this.store.select(fromSelectors.hasWebSite(authorId));

  public readonly filteredAuthors$ = this.store.select(fromSelectors.searchedAuthors);
  public readonly isFiltering$ = this.store.select(fromSelectors.isAuthorFiltered);
  public readonly isSelectingAuthor$ = this.store.select(fromSelectors.isProcessing);

  public readonly authorBooksPageResult$ =this.store.select(fromSelectors.authorBooksPageResult)
  public readonly authorBooksIds$ = this.store.select(fromSelectors.authorBooksIds);
  public readonly processingAuthorBooks$ = this.store.select(fromSelectors.processingAuthorBooks);

  public readonly error$ = this.store.select(fromSelectors.error);

  constructor(private readonly store: Store<fromModule.AuthorsModuleState>) { }

  selectSingle(authorId: number) {
    this.store.dispatch(SELECT_AUTHOR({ payload: { id: authorId } }))
  }

  selectByGuid(authorGuid: UUID) {
    this.store.dispatch(SELECT_AUTHOR_BY_GUID({ payload: { guid: authorGuid } }));
  }

  selectAuthorBooks(query: AuthorBooksPageQuery) {
    this.store.dispatch(SELECT_AUTHOR_BOOKS({ payload: { query: query } }));
  }

  selectMultipleAuthorsById(authorIds: number[]) {
    this.store.dispatch(SELECT_MULTIPLE_AUTHORS_BY_IDS({ payload: { ids: authorIds } }));
  }

  selectMultipleAuthorsByGuid(guids: UUID[]) {
    this.store.dispatch(SELECT_MULTIPLE_AUTHORS_BY_GUIDS({ payload: { guids: guids } }));
  }

  findAuthor(query: Query) {
    this.store.dispatch(START_FILTERING_AUTHORS({ payload: { query } }));
  }

  followAuthor(author: Author, userId: number) {
    this.store.dispatch(FOLLOW_AUTHOR({ payload: { author, userId } }))
  }

  unFollowAuthor(author: Author, userId: number) {
    this.store.dispatch(UNFOLLOW_AUTHOR({ payload: { author, userId } }));
  }

  removeAuthor(author: Author) {
    this.store.dispatch(REMOVE_AUTHOR({ payload: { author } }));
  }

  clearSearchResults() {
    this.store.dispatch(CLEAR_SEARCH_RESULTS());
  }

}
