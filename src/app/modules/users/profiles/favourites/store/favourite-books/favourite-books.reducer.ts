import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { FavouriteBook } from 'src/app/modules/api/profiles/favourites/models/favourite-book.model';
import * as fromActions from './favourite-books.actions';

export interface FavouriteBooksState {
  entities: { [readerId: number]: FavouriteBook[] },
  ids: number[],
  processing: boolean,
  error: ApiError
};

const initialState: FavouriteBooksState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_FAVOURITE_BOOKS, (state) => ({ ...state, processing: true })),
  on(fromActions.UPSERT_FAVOURITE_BOOKS, (state, action) => {
    const favourites: FavouriteBook[] = state.entities[action.payload.readerId];
    favourites.push(action.payload.favourite);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: favourites } }
  }),
  on(fromActions.REMOVE_BOOK_FROM_FAVOURITES, (state, action) => {
    let favourites: FavouriteBook[] = state.entities[action.payload.readerId];
    const element = favourites.find(f => f.bookGuid === action.payload.bookGuid);
    const index = favourites.indexOf(element);
    favourites.splice(index, 1);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: favourites } }
  }),
  on(fromActions.FETCH_FAVOURITE_BOOKS, (state, action) => {
    let ids = state.ids;
    ids.forEach(id => {
      if (!ids.find(p => p === id))
        ids.push(id);
    });

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.favourites }, ids: ids }
  }),
  on(fromActions.FETCH_FAVOURITE_BOOK_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  }),
  on(fromActions.FAVOURITE_BOOKS_SELECTED, (state) => ({ ...state, processing: false }))
);

export function favouriteBooksReducer(state: FavouriteBooksState, action: Action) {
  return reducer(state, action);
}
