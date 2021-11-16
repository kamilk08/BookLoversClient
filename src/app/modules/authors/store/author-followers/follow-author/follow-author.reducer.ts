import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Follower } from 'src/app/modules/shared';
import { Author } from '../../../../api/authors/authors/models/author.model';
import * as fromActions from './follow-author.actions';

export interface FollowAuthor {
  author: Author,
  userId: number
  succeded: boolean
  processing: boolean,
  error: ApiError
}

const initialState: FollowAuthor = {
  author: undefined,
  userId: undefined,
  succeded: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.FOLLOW_AUTHOR, (state, action) => {
    action.payload.author.followers.push(new Follower(action.payload.author.identification.id, action.payload.userId));
    return { ...state, author: action.payload.author, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.FOLLOW_AUTHOR_SUCCESS, (state) => {
    return { ...state, succeded: true, processing: false }
  }),
  on(fromActions.FOLLOW_AUTHOR_FALIURE, (state, action) => {
    return { ...state, succeded: false, processing: false, error: action.payload.model }
  })
);

export function followAuthorReducer(state: FollowAuthor, action: Action) {
  return reducer(state, action);
}
