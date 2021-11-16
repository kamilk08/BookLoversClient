import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddAuthorModel } from 'src/app/modules/api/authors/add-author/models/add-author.model';
import * as fromActions from './add-author.actions';

export interface AddAuthorState {
  authorId: number,
  currentAuthor: AddAuthorModel
  processing: boolean,
  success: boolean,
  error: ApiError
};

const initialState: AddAuthorState = {
  authorId: undefined,
  currentAuthor: undefined,
  processing: false,
  success: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.ADD_AUTHOR, (state, action) => {
    return { ...state, currentAuthor: action.payload.model, processing: true }
  }),
  on(fromActions.ADD_AUTHOR_SUCCESS, (state, action) => ({
    ...state, authorId: action.payload.authorId,
    processing: false, success: true
  })),
  on(fromActions.ADD_AUTHOR_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model, success: false }
  })
);

export function addAuthorReducer(state: AddAuthorState, action: Action) {
  return reducer(state, action);
}
