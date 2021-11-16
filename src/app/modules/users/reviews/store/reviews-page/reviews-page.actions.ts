import { createAction, props } from "@ngrx/store";

export const SET_READER_ID_ON_REVIEWS_PAGE = createAction('[REVIEWS] Set reader Id on reviews page', props<{ payload: { readerId: number } }>());
export const SET_REVIEWS_PAGE_SIZE = createAction('[REVIEWS] Set reviews page size', props<{ payload: { pageSize: number } }>());
export const NEXT_REVIEWS_PAGE = createAction('[REVIEWS] Next reviews page', props<{ payload: { page: number } }>());

