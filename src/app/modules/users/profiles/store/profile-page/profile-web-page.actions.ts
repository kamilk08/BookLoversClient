import { createAction, props } from "@ngrx/store";
import { UUID } from "angular2-uuid";

export const SET_READER_ID_ON_PROFILE_PAGE = createAction('[PROFILE] Set reader id on profile page', props<{ payload: { readerId: number } }>());
export const ADD_PROFILE_FAVOURITE_AUTHOR = createAction('[PROFILE] Add profile favourite author', props<{ payload: { guid: UUID } }>());
export const ADD_PROFILE_FAVOURITE_BOOK = createAction('[PROFILE] Add profile favourite book', props<{ payload: { guid: UUID } }>());
export const REMOVE_PROFILE_FAVOURITE_AUTHOR = createAction('[PROFILE] Remove profile favourite author', props<{ payload: { guid: UUID } }>());
export const REMOVE_PROFILE_FAVOURITE_BOOK = createAction('[PROFILE] Remove profile favourite book', props<{ payload: { guid: UUID } }>());
export const SEARCH_FAVOURITE_AUTHORS = createAction('[PROFILE] Search favourite authors', props<{ payload: { value: string } }>());
export const SEARCH_FAVOURITE_BOOKS = createAction('[PROFILE] Search favourite books', props<{ payload: { value: string } }>());



