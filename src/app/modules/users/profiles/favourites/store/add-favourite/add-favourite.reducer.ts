import { Action, createReducer, on } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';

import * as fromActions from './add-favourite.actions';

export interface AddFavouriteState {
  favouriteGuid: UUID
  processingBook: boolean,
  processingAuthor: boolean
  error: ApiError
}

const inititalState: AddFavouriteState = {
  favouriteGuid: undefined,
  processingBook: false,
  processingAuthor: false,
  error: undefined
};

const reducer = createReducer(inititalState,
  on(fromActions.ADD_FAVOURITE_AUTHOR, (state, action) => {
    return { ...state, favouriteGuid: action.payload.authorGuid, processingAuthor: true }
  }),
  on(fromActions.ADD_FAVOURITE_BOOK, (state, action) => {
    return { ...state, favouriteGuid: action.payload.bookGuid, processingBook: true }
  }),
  on(fromActions.ADD_FAVOURITE_AUTHOR_SUCCESS, (state) => ({ ...state })),
  on(fromActions.ADD_FAVOURITE_BOOK_SUCCESS, (state) => ({ ...state })),
  on(fromActions.ADD_FAVOURITE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processingBook: false, processingAuthor: false }
  }),
  on(fromActions.END_PROCESSING_FAVOURITE, (state => {
    return { ...state, processingBook: false, processingAuthor: false }
  }))
);

export function addFavouriteReducer(state: AddFavouriteState, action: Action) {
  return reducer(state, action);
};



