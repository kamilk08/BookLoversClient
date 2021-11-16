import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const DEGRADE_LIBRARIAN = createAction('[MANAGE_LIBRARIAN] Degrade librarian', props<{ payload: { readerGuid: UUID } }>());
export const DEGRADE_LIBRARAIN_SUCCESS = createAction('[MANAGE_LIBRARIAN] Degrade librarian success', props<{ payload: { readerGuid: UUID } }>());
export const DEGRADE_LIBRARIAN_ERROR = createAction('[MANAGE_LIBRARIAN] Degrade librarian error', props<{ payload: { error: ApiError } }>());
