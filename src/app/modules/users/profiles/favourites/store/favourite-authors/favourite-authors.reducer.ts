import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { FavouriteAuthor } from 'src/app/modules/api/profiles/favourites/models/favourite-author.model';
import * as fromActions from './favourite-authors.actions';

export interface FavouriteAuthorsState {
  entities: { [readerId: number]: FavouriteAuthor[] },
  ids: number[],
  processing: boolean,
  error: ApiError
};

const initialState: FavouriteAuthorsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_FAVOURITE_AUTHORS, (state) => ({ ...state, processing: true })),
  on(fromActions.UPSERT_FAVOURITE_AUTHORS, (state, action) => {
    const favourites: FavouriteAuthor[] = state.entities[action.payload.readerId];
    favourites.push(action.payload.favourite);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: favourites } }
  }),
  on(fromActions.REMOVE_FROM_FAVOURITES_AUTHOR, (state, action) => {
    let favourites: FavouriteAuthor[] = state.entities[action.payload.readerId];
    const element = favourites.find(f => f.authorGuid === action.payload.favouriteGuid);
    const index = favourites.indexOf(element);
    favourites.splice(index, 1);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: favourites } }
  }),
  on(fromActions.FETCH_FAVOURITE_AUTHORS, (state, action) => {
    let ids = state.ids;
    ids.forEach(id => {
      if (!ids.find(p => p === id))
        ids.push(id);
    });
    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.favourites }, ids: ids }
  }),
  on(fromActions.FETCH_FAVOURITE_AUTHORS_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error, processing: false }
  }),
  on(fromActions.FAVOURITE_AUTHORS_SELECTED, (state) => ({ ...state, processing: false }))
);

export function favouriteAuthorsReducer(state: FavouriteAuthorsState, action: Action) {
  return reducer(state, action);
}

