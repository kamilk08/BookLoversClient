import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Bookcase, Shelf } from '../../../models';

export const REMOVE_SHELF = createAction('[REMOVE_SHELF] Remove shelf', props<{ payload: { bookcase: Bookcase, shelf: Shelf } }>());
export const REMOVE_SHELF_SUCCESS = createAction('[REMOVE_SHELF] Remove shelf success', props<{ payload: { bookcase: Bookcase } }>());
export const REMOVE_SHELF_FALIURE = createAction('[REMOVE_SHELF] Remove shelf faliure', props<{ payload: { model: ApiError } }>());
