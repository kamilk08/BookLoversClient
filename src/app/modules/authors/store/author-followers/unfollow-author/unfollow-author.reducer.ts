import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../../api/authors/authors/models/author.model';
import * as fromActions from './unfollow-author.actions';

export interface UnFollowAuthor {
  author: Author,
  userId: number
  succeded: boolean
  processing: boolean,
  error: ApiError
}

const initialState: UnFollowAuthor = {
  author: undefined,
  userId: undefined,
  succeded: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.UNFOLLOW_AUTHOR, (state, action) => {
    action.payload.author = unFollowAuthor(action.payload.author, action.payload.userId);
    return { ...state, author: action.payload.author, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.UNFOLLOW_AUTHOR_SUCCESS, (state) => {
    return { ...state, succeded: true, processing: false }
  }),
  on(fromActions.UNFOLLOW_AUTHOR_FALIURE, (state, action) => {
    return { ...state, succeded: false, processing: false, error: action.payload.model }
  })
);

export function unFollowAuthorReducer(state: UnFollowAuthor, action: Action) {
  return reducer(state, action);
}


function unFollowAuthor(author: Author, userId: number) {
  const index = author.followers.findIndex(p => p.followedById === userId);
  author.followers.splice(index, 1);
  return author;
}
