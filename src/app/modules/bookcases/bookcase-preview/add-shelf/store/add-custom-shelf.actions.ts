import { createAction, props } from '@ngrx/store';
import { Bookcase, Shelf } from '../../../models';
import { AddShelfResponse } from '../../../../api/bookcases/api/responses/add-shelf.response';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const ADD_CUSTOM_SHELF = createAction('[ADD_SHELF] Add custom shelf', props<{ payload: { bookcase: Bookcase, shelf: Shelf } }>());
export const ADD_CUSTOM_SHELF_SUCCESS = createAction('[ADD_SHELF] Add custom shelf success', props<{ payload: { bookcase: Bookcase, shelfResponse: AddShelfResponse } }>());
export const ADD_CUSTOM_SHELF_FALIURE = createAction('[ADD_SHELF] Add custom shelf faliure', props<{ payload: { model: ApiError } }>());
