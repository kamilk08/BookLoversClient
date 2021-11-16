import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import * as fromActions from './author-web-page.actions';

export interface AuthorWebPageState {
  authorId: number,
  qoutesCount: number,
  booksCount: number,
  seriesCount: number,
  seriesBooksCount: number,
  booksPage: number,
  seriesPage: number,
  qoutesPage: number
  searchPhrase: string,
}

const initialState: AuthorWebPageState = {
  authorId: undefined,
  qoutesCount: 4,
  booksCount: 8,
  seriesCount: 4,
  seriesBooksCount: 5,
  booksPage: DEFAULT_PAGE,
  seriesPage: DEFAULT_PAGE,
  qoutesPage: DEFAULT_PAGE,
  searchPhrase: undefined,
};

const reducer = createReducer(initialState,
  on(fromActions.SET_AUTHOR_ID_ON_AUTHOR_WEB_PAGE, (state, action) => ({ ...state, authorId: action.payload.authorId })),
  on(fromActions.SET_MAX_QUOTES_PER_PAGE, (state, action) => ({ ...state, qoutesCount: action.payload.count })),
  on(fromActions.SET_MAX_BOOKS_PER_PAGE, (state, action) => ({ ...state, booksCount: action.payload.count })),
  on(fromActions.SET_MAX_SERIES_PER_PAGE, (state, action) => ({ ...state, seriesCount: action.payload.count })),
  on(fromActions.SEARCH_AUTHOR_BOOKS, (state, action) => ({ ...state, searchPhrase: action.payload.phrase })),
  on(fromActions.CHANGE_AUTHOR_BOOKS_PAGE, (state, action) => ({ ...state, booksPage: action.payload.page })),
  on(fromActions.CHANGE_AUTHOR_SERIES_PAGE, (state, action) => ({ ...state, seriesPage: action.payload.page })),
  on(fromActions.CHANGE_AUTHOR_QUOTES_PAGE, (state, action) => ({ ...state, qoutesPage: action.payload.page }))
);

export function authorWebPageReducer(state: AuthorWebPageState, action: Action) {
  return reducer(state, action);
}
