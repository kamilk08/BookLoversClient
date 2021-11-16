import { createAction, props } from "@ngrx/store";
import { FollowersPageOption } from "./followers-page.reducer";

export const SET_FOLLOWERS_PAGE_SIZE = createAction('[READER_FOLLOWERS] Set followers page size', props<{ payload: { pageSize: number } }>());
export const SET_READER_ID_ON_FOLLOWERS_PAGE = createAction('[READER_FOLLOWERS] Set reader Id on followers page', props<{ payload: { readerId: number } }>());
export const SET_FOLLOWERS_PAGE_OPTION = createAction('[READER_FOLLOWERS] Set followers page option', props<{ payload: { pageOption: FollowersPageOption } }>());
export const SET_SEARCH_PHRASE_ON_FOLLOWERS_PAGE = createAction('[READER_FOLLOWERS] Set search phrase on followers page', props<{ payload: { phrase: string } }>());
export const SET_CURRENT_FOLLOWERS_COUNT = createAction('[READER_FOLLOWERS] Set current followers count', props<{ payload: { count: number } }>());
export const SET_CURRENT_FOLLOWINGS_COUNT = createAction('[READER_FOLLOWERS] Set current followings count', props<{ payload: { count: number } }>());
export const NEXT_FOLLOWERS_PAGE = createAction('[READER_FOLLOWERS] Next followers page', props<{ payload: { page: number } }>());
export const NEXT_FOLLOWINGS_PAGE = createAction('[READER_FOLLOWERS] Next followings page', props<{ payload: { page: number } }>());
