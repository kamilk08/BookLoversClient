import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid'; import { ApiError } from 'src/app/modules/api/api-error.model';
;

export const REMOVE_FAVOURITE_AUTHOR = createAction('[FAVOURITES] Remove favourite author', props<{ payload: { authorGuid: UUID } }>());
export const REMOVE_FAVOURITE_BOOK = createAction('[FAVOURITES] Remove favourite book', props<{ payload: { bookGuid: UUID } }>());
export const REMOVE_FAVOURITE_AUTHOR_SUCCESS = createAction('[FAVOURITES] Remove favourite success', props<{ payload: { readerId: number, authorGuid: UUID } }>());
export const REMOVE_FAVOURITE_BOOK_SUCCESS = createAction('[FAVOURITES] Remove favourite book success', props<{ payload: { readerId: number, bookGuid: UUID } }>());
export const REMOVE_FAVOURITE_FALIURE = createAction('[FAVOURITES] Remove favourite faliure', props<{ payload: { error: ApiError } }>());
