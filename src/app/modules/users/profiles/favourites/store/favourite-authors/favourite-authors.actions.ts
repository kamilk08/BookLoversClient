import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { FavouriteAuthor } from '../../../../../api/profiles/favourites/models/favourite-author.model';

export const SELECT_FAVOURITE_AUTHORS = createAction('[FAVOURITES] Select favourite authors', props<{ payload: { readerId: number } }>());
export const UPSERT_FAVOURITE_AUTHORS = createAction('[FAVOURITES] Update favourite authors', props<{ payload: { readerId: number, favourite: FavouriteAuthor } }>());
export const REMOVE_FROM_FAVOURITES_AUTHOR = createAction('[FAVOURITES] Remove from favourite authors', props<{ payload: { readerId: number, favouriteGuid: UUID } }>());
export const FETCH_FAVOURITE_AUTHORS = createAction('[FAVOURITES] Fetch favourite authors', props<{ payload: { readerId: number, favourites: FavouriteAuthor[] } }>());
export const FETCH_FAVOURITE_AUTHORS_FALIURE = createAction('[FAVOURITES] Fetch favourite authors faliure', props<{ payload: { error: ApiError } }>());
export const FAVOURITE_AUTHORS_SELECTED = createAction('[FAVOURITES] Favourite authors selected');
