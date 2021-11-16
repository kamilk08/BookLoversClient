import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { Bookcase, Shelf } from "../../models";

export const SET_BOOKCASE_READER_ID = createAction('[BOOKCASE] Set bookcase reader id', props<{ payload: { readerId: number } }>());
export const SET_PAGE_BOOKCASE = createAction('[BOOKCASE] Set page bookcase', props<{ payload: { bookcase: Bookcase } }>());
export const SET_CURRENT_BOOKIDS_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Set current bookIds on bookcase page', props<{ payload: { bookIds: number[], sendHttpRequests: boolean } }>());
export const SET_SORT_ORDER_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Set sort order on bookcase page', props<{ payload: { descending: boolean } }>());
export const SET_SORT_TYPE_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Set sort type on bookcase page', props<{ payload: { sortType: SortType } }>());
export const SET_SEARCH_PHRASE_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Set search phrase on bookcase page', props<{ payload: { phrase: string } }>());
export const FILTER_BOOKCASE_BOOKS_BASED_ON_PHRASE = createAction('[BOOKCASE] Filter bookcase books based on phrase', props<{ payload: { phrase: string } }>());
export const SET_EMPTY_SEARCH_QUERY_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Set empty search query on bookcase page');
export const ADD_OR_REMOVE_SHELF_ON_BOOKCASE_PAGE = createAction('[BOOKCASE] Add or remove shelf on bookcase page', props<{ payload: { shelf: Shelf } }>());
export const CHANGE_BOOKCASE_COLLECTION_PAGE = createAction('[BOOKCASE] Change bookcase collection page', props<{ payload: { page: number } }>());
export const RESET_BOOKCASE_PAGE = createAction('[BOOKCASE] Reset bookcase page');

export const OPEN_REMOVE_BOOK_FROM_BOOKCASE_MODAL = createAction('[BOOKCASE] Open remove book from bookcase modal', props<{ payload: { book: Book } }>());
export const BOOK_REMOVED_FROM_BOOKCASE_BY_USER = createAction('[BOOKCASE] Book removed from bookcase by user', props<{ payload: { book: Book } }>());
export const OPEN_READED_SHELF_MODAL = createAction('[BOOKCASE] Open readed shelf modal', props<{ payload: { book: Book } }>());
export const BOOK_REMOVED_FROM_CORE_SHELF = createAction('[BOOKCASE] Book removed from core shelf')

export const TOGGLE_SEARCH_BAR = createAction('[BOOKCASE] TOGGLE_SEARCH_BAR', props<{ payload: { flag: boolean } }>());

export const NO_ACTION = createAction('[BOOKCASE] No action');
