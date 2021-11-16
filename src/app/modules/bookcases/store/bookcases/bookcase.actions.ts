import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { BookcaseNotFound } from '../../models/bookcase-not-found';
import { Bookcase } from '../../models/bookcase.model';

export const SELECT_BOOKCASE = createAction('[BOOKCASE] Select bookcase', props<{ payload: { id: number } }>());
export const SELECT_USER_BOOKCASE = createAction('[BOOKCASE] Select user bookcase', props<{ payload: { userId: number } }>());
export const SELECT_CURRENT_USER_BOOKCASE = createAction('[BOOKCASE] Select current user bookcase');
export const FETCH_BOOKCASE = createAction('[BOOKCASE] Fetch bookcase', props<{ payload: { bookcase: Bookcase } }>());
export const FETCH_BOOKCASE_FALIURE = createAction('[BOOKCASE] Fetch faliure', props<{ payload: { model: ApiError } }>())
export const ADD_OR_UPDATE_BOOKCASE = createAction('[BOOKCASE] Add or update bookcase', props<{ payload: { bookcase: Bookcase } }>());

export const BOOKCASE_NOT_FOUND = createAction('[BOOKCASE] Bookcase not found', props<{ payload: { model: BookcaseNotFound } }>());
export const NO_BOOKCASE_ACTION = createAction('[BOOKCASE] No bookcase action');
