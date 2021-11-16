import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { ActivityType } from "../../../../api/timelines/models/activity-type.interface";
import { TimeLineActivity } from "../../../../api/timelines/models/timeline-activity.interface";

export const SET_TIMELINE_ID_ON_TIMELINE_PAGE = createAction('[TIMELINES] Set timeline id on timeline page.', props<{ payload: { id: number } }>());
export const SET_PAGE_SIZE_ON_TIMELINE_PAGE = createAction('[TIMELINES] Set page size on timeline page', props<{ payload: { pageSize: number } }>());
export const NEXT_TIMELINE_ACTIVITIES_PAGE = createAction('[TIMELINES] Next timeline activities page', props<{ payload: { page: number } }>());
export const INCLUDE_HIDDEN_ACTIVITIES = createAction('[TIMELINES] Include hidden activities', props<{ payload: { flag: boolean } }>());
export const TOGGLE_ACTIVITY = createAction('[TIMELINES] Toggle activity', props<{ payload: { activity: TimeLineActivity } }>());

export const EXPAND_TIMELINE_ACTIVITY = createAction('[TIMELINES] Expand timeline activity', props<{ payload: { activityType: ActivityType, activityObject: any } }>());
export const EXPAND_NEW_BOOK_IN_BOOKCASE_ACTIVITY = createAction('[TIMELINES] Expand new book in bookcase activity', props<{ payload: { book: Book } }>());
export const EXPAND_BOOK_ADDED_ACTIVITY = createAction('[TIMELINES] Expand book added activity', props<{ payload: { book: Book } }>());
export const EXPAND_NEW_BOOK_REVIEW_ACTIVITY = createAction('[TIMELINES] Expand new book review activity', props<{ payload: { book: Book } }>());
