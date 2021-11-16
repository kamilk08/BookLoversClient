import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { Quote } from "src/app/modules/api/quotes/models/quote.model";

export const SET_AUTHOR_ID_ON_AUTHOR_WEB_PAGE = createAction('[AUTHORS] Set author Id on web page', props<{ payload: { authorId: number } }>());
export const SET_MAX_QUOTES_PER_PAGE = createAction('[AUTHORS] Set max quotes per page', props<{ payload: { count: number } }>());
export const SET_MAX_BOOKS_PER_PAGE = createAction('[AUTHORS] Set max books per page', props<{ payload: { count: number } }>());
export const SET_MAX_SERIES_PER_PAGE = createAction('[AUTHORS] Set max series per page', props<{ payload: { count: number } }>());

export const CHANGE_AUTHOR_BOOKS_PAGE = createAction('[AUTHORS] Change authors books page', props<{ payload: { page: number } }>());
export const CHANGE_AUTHOR_SERIES_PAGE = createAction('[AUTHORS] Change authors series page', props<{ payload: { page: number } }>());
export const CHANGE_AUTHOR_QUOTES_PAGE = createAction('[AUTHORS] Change author quotes page', props<{ payload: { page: number } }>());

export const OPEN_EDIT_AUTHOR_MODAL = createAction('[AUTHORS] Open edit author modal', props<{ payload: { author: Author } }>());
export const OPEN_AUTHOR_REMOVE_MODAL = createAction('[AUTHORS] Open author remove modal', props<{ payload: { author: Author } }>());
export const ADD_OR_REMOVE_QUOTE_LIKE = createAction('[AUTHORS] Add or remove quote like', props<{ payload: { quote: Quote } }>());

export const SEARCH_AUTHOR_BOOKS = createAction('[AUTHORS] Search author books', props<{ payload: { phrase: string } }>());
