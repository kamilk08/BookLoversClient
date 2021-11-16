import { createAction, props } from "@ngrx/store";
import { SortType } from "src/app/modules/shared/common/sort-type";

export const SET_BOOKS_COUNT = createAction('[PUBLISHER] Set books count', props<{ payload: { count: number } }>());

export const SELECT_PAGE_PUBLISHER = createAction('[PUBLISHER] Select page publisher', props<{ payload: { id: number } }>());
export const SET_SEARCH_PHRASE = createAction('[PUBLISHER] Set search phrase', props<{ payload: { phrase: string } }>());

export const CHANGE_PUBLISHER_BOOKS_ORDER = createAction('[PUBLISHER] Change publisher books order', props<{ payload: { descending: boolean } }>());
export const CHANGE_PUBLISHER_BOOKS_SORT_TYPE = createAction('[PUBLISHER] Change publisher books sort type', props<{ payload: { sortType: SortType } }>());

export const NEXT_PUBLISHER_BOOKS_PAGE = createAction('[PUBLISHER] Next publisher books page', props<{ payload: { page: number } }>());
export const TOGGLE_PUBLISHER_PAGE_SPINNER = createAction('[PUBLISHER] Toggle publisher page spinner', props<{ payload: { show: boolean } }>());

export const RESET_PUBLISHER_PAGE = createAction('[PUBLISHER] Reset publisher page');
