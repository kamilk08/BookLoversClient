import { createAction, props } from "@ngrx/store";
import { SortType } from "src/app/modules/shared/common/sort-type";


export const SET_BOOK_ID = createAction('[BOOKS] Set book id', props<{ payload: { bookId: number } }>());
export const CHANGE_REVIEWS_PAGE = createAction('[BOOKS] Change reviews page', props<{ payload: { page: number } }>());
export const CHANGE_REVIEWS_SORT_TYPE = createAction('[BOOKS] Change reviews sort type', props<{ payload: { sortType: SortType } }>());
export const CHANGE_REVIEWS_SORT_ORDER = createAction('[BOOKS] Change reviews sort order', props<{ payload: { descending: boolean } }>());

