import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddAuthorModel } from 'src/app/modules/api/authors/add-author/models/add-author.model';

export const ADD_AUTHOR = createAction('[ADD-AUTHOR] Add author', props<{ payload: { model: AddAuthorModel } }>());
export const ADD_AUTHOR_FALIURE = createAction('[ADD-AUTHOR] Add author faliure', props<{ payload: { model: ApiError } }>());
export const ADD_AUTHOR_SUCCESS = createAction('[ADD-AUTHOR] Add author success', props<{ payload: { authorId: number } }>());
