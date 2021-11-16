import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { TimeLine } from '../../../../api/timelines/models/timeline.interface';
import { TimelineNotFound } from '../../models/timeline-not-found';

export const SELECT_TIMELINE = createAction('[TIMELINE] Select timeline', props<{ payload: { id: number } }>());
export const SELECT_READER_TIMELINE = createAction('[TIMELINE] Select reader timeline', props<{ payload: { readerId: number } }>());
export const FETCH_READER_TIMELINE = createAction('[TIMELINE] Fetch reader timeline', props<{ payload: { timeLine: TimeLine } }>());
export const FETCH_READER_TIMELINE_FALIURE = createAction('[TIMELINE] Fetch reader timeline faliure', props<{ payload: { model: ApiError } }>());

export const TIMELINE_NOT_FOUND = createAction('[TIMELINE] Timeline not found', props<{ payload: { model: TimelineNotFound } }>());
