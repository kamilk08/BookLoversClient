
import * as fromAuthor from './authors/author.reducer';
import * as fromSearchAuthor from './search-authors/search-author.reducer';
import * as fromFollowAuthor from './author-followers/follow-author/follow-author.reducer';
import * as fromUnFollowAuthor from './author-followers/unfollow-author/unfollow-author.reducer';
import * as fromAuthorWebPage from './author-web-page/author-web-page.reducer';
import * as fromAuthorBooks from './author-books/author-books.reducer';
import * as fromRemoveAuthor from './remove-author/remove-author.reducer';

import { combineReducers, ActionReducerMap, Action, createFeatureSelector } from '@ngrx/store';

export interface AuthorsModuleState {
  authors: fromAuthor.AuthorsState,
  authorBooks: fromAuthorBooks.AuthorBooksState,
  searchAuthor: fromSearchAuthor.SearchAuthor,
  followAuthor: fromFollowAuthor.FollowAuthor,
  unFollowAuthor: fromUnFollowAuthor.UnFollowAuthor,
  authorWebPage: fromAuthorWebPage.AuthorWebPageState,
  removeAuthor: fromRemoveAuthor.RemoveAuthor
};

const reducersMap: ActionReducerMap<AuthorsModuleState> = {
  authors: fromAuthor.authorReducer,
  authorBooks: fromAuthorBooks.authorBooksReducer,
  searchAuthor: fromSearchAuthor.searchAuthorReducer,
  followAuthor: fromFollowAuthor.followAuthorReducer,
  unFollowAuthor: fromUnFollowAuthor.unFollowAuthorReducer,
  authorWebPage: fromAuthorWebPage.authorWebPageReducer,
  removeAuthor: fromRemoveAuthor.removeAuthorReducer
}

const reducer = combineReducers(reducersMap);

export function authorsModuleReducer(state: AuthorsModuleState, action: Action) {
  return reducer(state, action);
}

export const authorsModuleState = createFeatureSelector('authors');
