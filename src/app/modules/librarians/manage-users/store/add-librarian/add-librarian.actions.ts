import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddLibrarianModel } from 'src/app/modules/api/librarians/models/add-librarian.model';

export const ADD_LIBRARIAN = createAction('[MANAGE_LIBRARIAN] Create librarian', props<{ payload: { model: AddLibrarianModel } }>());
export const ADD_LIBRARIAN_SUCCESS = createAction('[MANAGE_LIBRARIAN] Create librarian success', props<{ payload: { librarianId: number } }>());
export const ADD_LIBRARIAN_FALIURE = createAction('[MANAGE_LIBRARIAN] Create librarian error', props<{ payload: { model: ApiError } }>());
