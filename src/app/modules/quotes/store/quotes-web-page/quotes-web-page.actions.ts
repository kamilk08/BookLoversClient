import { createAction, props } from "@ngrx/store";

export const SET_BOOK_QUOTES_ID = createAction('[QUOTES] Set book quotes id', props<{ payload: { bookId: number } }>());
export const CHANGE_BOOK_QUOTES_SORT_ORDER = createAction('[QUOTES] Change book quotes sort order', props<{ payload: { descending: boolean } }>());
export const CHANGE_BOOK_QUOTES_PAGE = createAction('[QUOTES] Change book quotes page', props<{ payload: { page: number } }>());
