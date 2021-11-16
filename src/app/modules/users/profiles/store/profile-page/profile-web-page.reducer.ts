import { Action, createReducer, on } from "@ngrx/store"
import * as fromActions from './profile-web-page.actions';

export interface ProfileWebPageState {
  readerId: number
}

const initialState: ProfileWebPageState = {
  readerId: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SET_READER_ID_ON_PROFILE_PAGE, (state, action) => ({ ...state, readerId: action.payload.readerId })),
  on(fromActions.ADD_PROFILE_FAVOURITE_AUTHOR, (state) => ({ ...state })),
  on(fromActions.ADD_PROFILE_FAVOURITE_BOOK, (state) => ({ ...state })),
  on(fromActions.REMOVE_PROFILE_FAVOURITE_AUTHOR, (state => ({ ...state }))),
  on(fromActions.REMOVE_PROFILE_FAVOURITE_BOOK, (state => ({ ...state }))),
  on(fromActions.SEARCH_FAVOURITE_AUTHORS, (state) => ({ ...state })),
  on(fromActions.SEARCH_FAVOURITE_BOOKS, (state) => ({ ...state }))
);

export function profileWebPageReducer(state: ProfileWebPageState, action: Action) {
  return reducer(state, action);
}
