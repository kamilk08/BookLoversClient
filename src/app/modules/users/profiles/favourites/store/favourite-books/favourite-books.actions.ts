import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { FavouriteBook } from '../../../../../api/profiles/favourites/models/favourite-book.model';

export const SELECT_FAVOURITE_BOOKS = createAction('[FAVOURITES] Select favourite books', props<{ payload: { readerId: number } }>());
export const UPSERT_FAVOURITE_BOOKS = createAction('[FAVOURITES] Upsert favourite books', props<{ payload: { readerId: number, favourite: FavouriteBook } }>());
export const REMOVE_BOOK_FROM_FAVOURITES = createAction('[FAVOURITES] Remove book from favourites', props<{ payload: { readerId: number, bookGuid: UUID } }>());
export const FETCH_FAVOURITE_BOOKS = createAction('[FAVOURITES] Fetch favourite books', props<{ payload: { readerId: number, favourites: FavouriteBook[] } }>());
export const FETCH_FAVOURITE_BOOK_FALIURE = createAction('[FAVOURITES] Fetch favourite book faliure', props<{ payload: { error: ApiError } }>());
export const FAVOURITE_BOOKS_SELECTED = createAction('[FAVOURITES] Favourite books selected');
