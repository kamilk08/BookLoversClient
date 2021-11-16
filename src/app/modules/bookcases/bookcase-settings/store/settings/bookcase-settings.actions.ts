import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Bookcase } from '../../../models';
import { BookcaseSettings } from '../../models/bookcase-settings.model';

export const SET_BOOKCASE_SETTINGS = createAction('[BOOKCASE] Set bookcase settings', props<{ payload: { bookcaseId: number, settings: BookcaseSettings } }>());
export const CHANGE_BOOKCASE_SETTINGS = createAction('[BOOKCASE] Change bookcase settings', props<{ payload: { bookcase: Bookcase, settings: BookcaseSettings } }>());
export const CHANGE_BOOKCASE_SETTINGS_FALIURE = createAction('[BOOKCASE] Change bookcase settings faliure', props<{ payload: { model: ApiError } }>());
export const CHANGE_BOOKCASE_SETTINGS_SUCCESS = createAction('[BOOKCASE] Change bookcase settings success', props<{ payload: { bookcase: Bookcase, settings: BookcaseSettings } }>());
