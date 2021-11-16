import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Bookcase, Shelf } from '../../../models';

export const EDIT_CUSTOM_SHELF_NAME = createAction('[EDIT_SHELF] Edit custom shelf name', props<{ payload: { bookcase: Bookcase, shelf: Shelf, shelfName: string, oldShelfName?: string } }>());
export const EDIT_CUSOTM_SHELF_SUCCESS = createAction('[EDIT_SHELF] Edit custom shelf name success', props<{ payload: { bookcase: Bookcase } }>());
export const EDIT_CUSTOM_SHELF_NAME_FALIURE = createAction('[EDIT_SHELF] Edit custom shelf name faliure', props<{ payload: { model: ApiError } }>());
