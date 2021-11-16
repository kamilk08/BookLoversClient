import { environment } from 'src/environments/environment';

export const GET_TIMELINE_BY_ID = (id:number)=>`${environment.api}/timelines/${id}`
export const GET_TIMELINE_BY_READER_ID = (readerId: number) => `${environment.api}/timelines/reader/${readerId}`;
export const GET_TIMELINE_ACTIVITIES = (timelineId: number, page: number, count: number, hidden: boolean) => `${environment.api}/timelines/${timelineId}/activities/${page}/${count}/${hidden}`;
export const SHOW_ACTIVITY = `${environment.api}/timelines/activity/show`;
export const HIDE_ACTIVITY = `${environment.api}/timelines/activity/hide`;
