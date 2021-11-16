import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Publisher } from '../../../api/publishers/models/publisher.model';
import { PublisherNotFound } from '../../models/publisher-not-found';

export const SELECT_PUBLISHER = createAction('[BOOKS] Select publisher', props<{ payload: { id: number } }>());
export const SELECT_PUBLISHER_BY_BOOK = createAction('[BOOKS] Select publisher by bookId', props<{ payload: { bookId: number } }>());

export const UPSERT_PUBLISHER = createAction('[BOOKS] Upsert publisher', props<{ payload: { publisher: Publisher, publisherId: number } }>());
export const FETCH_PUBLIHSER = createAction('[BOOKS] Fetch publisher', props<{ payload: { publisher: Publisher } }>());
export const FETCH_PUBLISHER_FALIURE = createAction('[BOOKS] Fetch publisher faliure', props<{ payload: { model: ApiError } }>());

export const PUBLISHER_NOT_FOUND = createAction('[BOOKS] Publisher not found', props<{ payload: { model: PublisherNotFound } }>());
