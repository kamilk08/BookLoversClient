import { createAction, props } from '@ngrx/store';
import { Reader } from '../../../../api/readers/models/reader.model';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const SELECT_READER = createAction('[READERS] Select reader', props<{ payload: { readerId: number } }>());
export const SELECT_READER_BY_GUID = createAction('[READERS] Select reader by guid', props<{ payload: { guid: UUID } }>());
export const FETCH_READER = createAction('[READERS] Fetch reader', props<{ payload: { reader: Reader } }>());
export const FETCH_MULTIPLE_READERS = createAction('[READERS] Fetch multiple readers', props<{ payload: { readers: Reader[] } }>());

export const FETCH_READER_FALIURE = createAction('[READERS] Fetch reader faliure', props<{ payload: { model: ApiError } }>());
export const NO_READER_ACTION = createAction('[READERS] No reader actions');
