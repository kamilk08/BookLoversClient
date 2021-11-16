import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';


export const ADD_FAVOURITE_AUTHOR = createAction('[FAVOURITES] Add favourite author', props<{ payload: { authorGuid: UUID } }>());
export const ADD_FAVOURITE_BOOK = createAction('[FAVOURITES] Add favourite book', props<{ payload: { bookGuid: UUID } }>());
export const ADD_FAVOURITE_AUTHOR_SUCCESS = createAction('[FAVOURITES] Add favourite author success', props<{ payload: { readerId: number, favouriteGuid: UUID } }>());
export const ADD_FAVOURITE_BOOK_SUCCESS = createAction('[FAVOURITES] Add favourite book success', props<{ payload: { readerId: number, favouriteGuid: UUID } }>());
export const ADD_FAVOURITE_FALIURE = createAction('[FAVOURITES] Add favourite faliure', props<{ payload: { error: ApiError } }>());
export const END_PROCESSING_FAVOURITE = createAction('[FAVOURITES] End processing favourites');
