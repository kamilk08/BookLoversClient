import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT } from "src/app/modules/shared/common/query";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { SORT_PUBLISHER_BOOKS_BY_TITLE } from "../../models/publisher-sort-type";
import * as fromActions from './publisher-page.actions';

export interface PublisherPageState {
  booksCount: number,
  publisherId: number,
  sortType: SortType,
  descending: boolean,
  page: number,
  phrase: string
}

const initialState: PublisherPageState = {
  booksCount: DEFAULT_ITEMS_COUNT,
  publisherId: undefined,
  sortType: SORT_PUBLISHER_BOOKS_BY_TITLE,
  descending: true,
  page: 0,
  phrase: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SET_BOOKS_COUNT, (state, action) => ({ ...state, booksCount: action.payload.count })),
  on(fromActions.SELECT_PAGE_PUBLISHER, (state, action) => {
    return { ...state, publisherId: action.payload.id }
  }),
  on(fromActions.SET_SEARCH_PHRASE, (state, action) => {
    return { ...state, phrase: action.payload.phrase }
  }),
  on(fromActions.CHANGE_PUBLISHER_BOOKS_ORDER, (state, action) => {
    return { ...state, descending: action.payload.descending }
  }),
  on(fromActions.CHANGE_PUBLISHER_BOOKS_SORT_TYPE, (state, action) => {
    return { ...state, sortType: action.payload.sortType }
  }),
  on(fromActions.NEXT_PUBLISHER_BOOKS_PAGE, (state, action) => {
    return { ...state, page: action.payload.page }
  }),
  on(fromActions.RESET_PUBLISHER_PAGE, (state) => {
    return {
      ...state,
      booksCount: DEFAULT_ITEMS_COUNT,
      publisherId: undefined,
      books: [],
      sortType: SORT_PUBLISHER_BOOKS_BY_TITLE,
      descending: true,
      page: 0,
      phrase: undefined,
      showSpinner: false
    }
  })
);

export function publisherPageReducer(state: PublisherPageState, action: Action) {
  return reducer(state, action);
};

