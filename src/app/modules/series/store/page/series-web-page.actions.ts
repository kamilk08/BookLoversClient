import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { SortType } from "src/app/modules/shared/common/sort-type";

export const SET_SERIES_ID = createAction('[SERIES] Set series id', props<{ payload: { seriesId: number } }>());
export const SET_SERIES_BOOKS_COLLECTION = createAction('[SERIES] Set series books collection', props<{ payload: { books: Book[] } }>());
export const SET_BOOKS_COUNT_ON_SERIES_PAGE = createAction('[SERIES] Set books count on series page', props<{ payload: { count: number } }>());
export const CHANGE_SERIES_PAGE_SORT_TYPE = createAction('[SERIES] Change series page sort type', props<{ payload: { sortType: SortType } }>());
export const CHNAGE_SERIES_PAGE_ORDER = createAction('[SERIES] Change series page sort order', props<{ payload: { descending: boolean } }>());
export const SET_SERIES_PAGE_SEARCH_PHRASE = createAction('[SERIES] Change series page search phrase', props<{ payload: { phrase: string } }>());
export const NEXT_SERIES_BOOKS_PAGE = createAction('[SERIES] Next series book page', props<{ payload: { page: number } }>());

