import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { TimeLineActivity } from '../../../../api/timelines/models/timeline-activity.interface';

export const HIDE_ACTIVITY = createAction('[TIMELINE] Hide activity', props<{ payload: { activity: TimeLineActivity } }>());
export const HIDE_ACTIVITY_SUCCESS = createAction('[TIMELINE] Hide activity success');
export const HIDE_ACTIVITY_FALIURE = createAction('[TIMELINE] Hide activity faliure', props<{ payload: { model: ApiError } }>())

export const SHOW_ACTIVITY = createAction('[TIMELINE] Show activity', props<{ payload: { activity: TimeLineActivity } }>());
export const SHOW_ACTIVITY_SUCCESS = createAction('[TIMELINE] Show activity success');
export const SHOW_ACTIVITY_FALIURE = createAction('[TIMELINE] Show activity faliure', props<{ payload: { model: ApiError } }>());
