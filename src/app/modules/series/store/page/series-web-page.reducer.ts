import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { SORT_SERIES_BOOKS_BY_TITLE } from "../../index/models/series-sort-type";
import * as fromActions from './series-web-page.actions';

export interface SeriesWebPageState {
  seriesId: number
  currentPage: number
  searchPhrase: string
  descending: boolean
  sortType: SortType
  pageSize: number
}

const initialState: SeriesWebPageState = {
  seriesId: undefined,
  currentPage: DEFAULT_PAGE,
  searchPhrase: undefined,
  descending: true,
  sortType: SORT_SERIES_BOOKS_BY_TITLE,
  pageSize: DEFAULT_ITEMS_COUNT
};

const reducer = createReducer(initialState,
  on(fromActions.SET_SERIES_ID, (state, action) => ({ ...state, seriesId: action.payload.seriesId })),
  on(fromActions.SET_BOOKS_COUNT_ON_SERIES_PAGE, (state, action) => {
    return ({ ...state, pageSize: action.payload.count })
  }),
  on(fromActions.NEXT_SERIES_BOOKS_PAGE, (state, action) => {
    return ({ ...state, currentPage: action.payload.page })
  }),
  on(fromActions.SET_SERIES_PAGE_SEARCH_PHRASE, (state, action) => ({ ...state, searchPhrase: action.payload.phrase })),
  on(fromActions.CHANGE_SERIES_PAGE_SORT_TYPE, (state, action) => ({ ...state, sortType: action.payload.sortType })),
  on(fromActions.CHNAGE_SERIES_PAGE_ORDER, (state, action) => ({ ...state, descending: action.payload.descending })),
  on(fromActions.SET_SERIES_BOOKS_COLLECTION, (state, action) => ({ ...state, books: action.payload.books })),
);

export function seriesWebPageReducer(state: SeriesWebPageState, action: Action) {
  return reducer(state, action);
}
