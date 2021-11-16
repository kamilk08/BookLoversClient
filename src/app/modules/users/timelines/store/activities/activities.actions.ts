import { createAction, props } from '@ngrx/store';
import { TimeLineActivity } from '../../../../api/timelines/models/timeline-activity.interface';

export const FETCH_ACTIVITIES = createAction('[TIMELINES] Fetch activities', props<{ payload: { activities: TimeLineActivity[] } }>());
export const FETCH_ACTIVITITES_ERROR = createAction('[TIMELINES] Fetch activities error', props<{ payload: { error: any } }>());
export const UPDATE_ACTIVITY = createAction('[TIMELINES] Update activity', props<{ payload: { activity: TimeLineActivity } }>());
