import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Publisher } from '../../../api/publishers/models/publisher.model';

export const ADD_PUBLISHER = createAction('[PUBLISHER] Add publisher', props<{ payload: { publisher: Publisher } }>());
export const ADD_PUBLISHER_SUCCESS = createAction('[PUBLISHER] Add publisher success', props<{ payload: { publisherId: number } }>());
export const ADD_PUBLISHER_FALIURE = createAction('[PUBLISHER] Add publisher faliure', props<{ payload: { model: ApiError } }>());
