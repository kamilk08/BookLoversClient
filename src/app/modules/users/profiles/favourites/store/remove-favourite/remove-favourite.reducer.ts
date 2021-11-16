import { Action, createReducer, on } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from './remove-favourite.actions';


export interface RemoveFavouritesState {
  favouriteGuid: UUID
  processing: boolean
  error: ApiError
}

const initialState: RemoveFavouritesState = {
  favouriteGuid: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_FAVOURITE_AUTHOR, (state, action) => {

    return { ...state, favouriteGuid: action.payload.authorGuid, processing: true }
  }),
  on(fromActions.REMOVE_FAVOURITE_BOOK, (state, action) => {
    return { ...state, favouriteGuid: action.payload.bookGuid, processing: true }
  }),
  on(fromActions.REMOVE_FAVOURITE_AUTHOR_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_FAVOURITE_BOOK_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.REMOVE_FAVOURITE_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  })
);

export function removeFavouriteReducer(state: RemoveFavouritesState, action: Action) {
  return reducer(state, action);
}
